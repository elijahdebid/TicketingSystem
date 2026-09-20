-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: customers
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  preferred_contact_method VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ticket Number Sequence table for locking and yearly resets
CREATE TABLE ticket_sequences (
  year INTEGER PRIMARY KEY,
  last_value INTEGER NOT NULL DEFAULT 0
);

-- Function to generate ticket number like IT-YYYY-000001
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS VARCHAR AS $$
DECLARE
  current_year INTEGER;
  next_seq INTEGER;
  ticket_number VARCHAR;
BEGIN
  current_year := EXTRACT(YEAR FROM CURRENT_DATE);
  
  -- Insert or get the sequence for the current year, locking the row for update
  INSERT INTO ticket_sequences (year, last_value)
  VALUES (current_year, 0)
  ON CONFLICT (year) DO NOTHING;

  UPDATE ticket_sequences
  SET last_value = last_value + 1
  WHERE year = current_year
  RETURNING last_value INTO next_seq;

  -- Format: IT-YYYY-XXXXXX
  ticket_number := 'IT-' || current_year || '-' || LPAD(next_seq::text, 6, '0');
  
  RETURN ticket_number;
END;
$$ LANGUAGE plpgsql;

-- Table: tickets
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number VARCHAR(50) UNIQUE NOT NULL DEFAULT generate_ticket_number(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  
  category VARCHAR(255) NOT NULL,
  service_type VARCHAR(255),
  
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  
  device_type VARCHAR(100),
  device_brand VARCHAR(100),
  device_model VARCHAR(100),
  serial_number VARCHAR(100),
  
  location TEXT,
  preferred_service_date TIMESTAMP WITH TIME ZONE,
  
  status VARCHAR(50) NOT NULL DEFAULT 'NEW',
  priority VARCHAR(50) NOT NULL DEFAULT 'NORMAL',
  
  diagnosis TEXT,
  work_performed TEXT,
  recommendation TEXT,
  technician_notes TEXT,
  internal_notes TEXT,
  
  estimated_cost NUMERIC(10, 2),
  actual_cost NUMERIC(10, 2),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Table: ticket_activities
CREATE TABLE ticket_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  action VARCHAR(255) NOT NULL,
  old_value TEXT,
  new_value TEXT,
  performed_by UUID, -- Can be null for automated/system actions, or references auth.users(id)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: profiles (for admin users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'TECHNICIAN',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: app_settings (configurable details)
CREATE TABLE app_settings (
  id VARCHAR(50) PRIMARY KEY,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tickets_ticket_number ON tickets(ticket_number);
CREATE INDEX idx_tickets_customer_id ON tickets(customer_id);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_priority ON tickets(priority);
CREATE INDEX idx_tickets_created_at ON tickets(created_at);
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_ticket_activities_ticket_id ON ticket_activities(ticket_id);

-- Updated_at triggers
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_customers_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_tickets_updated_at
BEFORE UPDATE ON tickets
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_sequences ENABLE ROW LEVEL SECURITY;

-- Service Role policies (bypass RLS is implicit for service role, but good to be explicit or use security definer functions for public endpoints if preferred).
-- For this setup: The public request form will use a Server Action with the Service Role key to create the initial customer and ticket securely. Thus we don't need permissive public INSERT policies on the tables themselves, keeping them fully locked down from anonymous client API access.

-- Admin Policies: Authenticated users can do everything
CREATE POLICY "Admins have full access to customers" ON customers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to tickets" ON tickets FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to ticket_activities" ON ticket_activities FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to profiles" ON profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to app_settings" ON app_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Deny all by default to anon. (They don't get policies, so they can't access via client API).
