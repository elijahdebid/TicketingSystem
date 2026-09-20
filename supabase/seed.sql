-- Seed customers
INSERT INTO customers (id, full_name, phone, email, preferred_contact_method)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Juan Dela Cruz', '09171234567', 'juan@example.com', 'Phone'),
  ('22222222-2222-2222-2222-222222222222', 'Maria Santos', '09187654321', 'maria.santos@example.com', 'SMS'),
  ('33333333-3333-3333-3333-333333333333', 'Pedro Penduko', '09199876543', 'pedro@example.com', 'Facebook Messenger');

-- Ensure the sequence exists for 2026
INSERT INTO ticket_sequences (year, last_value) VALUES (2026, 0) ON CONFLICT DO NOTHING;

-- Seed tickets (letting the default generate_ticket_number() run)
INSERT INTO tickets (
  id, customer_id, category, service_type, subject, description, 
  device_brand, device_model, status, priority, created_at, updated_at
) VALUES 
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 
    '11111111-1111-1111-1111-111111111111', 
    'Computer & Laptop', 'Windows Installation & Setup', 
    'Need fresh install of Windows 11', 'My laptop is very slow and has viruses. Please reformat and install Windows 11.', 
    'Dell', 'Inspiron 15', 'NEW', 'NORMAL',
    NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 
    '22222222-2222-2222-2222-222222222222', 
    'Networking', 'Wi-Fi Setup', 
    'Cannot connect to internet', 'The router is blinking red, I tried restarting it but it still does not work.', 
    'TP-Link', 'Archer AX50', 'IN_PROGRESS', 'HIGH',
    NOW() - INTERVAL '1 day', NOW()
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc', 
    '33333333-3333-3333-3333-333333333333', 
    'Printer & Peripherals', 'Printer Troubleshooting', 
    'Printer is not printing black ink', 'I already replaced the cartridge but nothing comes out. Need help fixing this asap.', 
    'Epson', 'L3110', 'WAITING_FOR_PARTS', 'NORMAL',
    NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 day'
  ),
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd', 
    '11111111-1111-1111-1111-111111111111', 
    'Computer & Laptop', 'Hardware Upgrades', 
    'Add more RAM', 'Want to upgrade from 8GB to 16GB RAM for gaming.', 
    'Asus', 'TUF Dash', 'COMPLETED', 'LOW',
    NOW() - INTERVAL '5 days', NOW() - INTERVAL '2 days'
  );

-- Update the completed ticket
UPDATE tickets SET completed_at = NOW() - INTERVAL '2 days', actual_cost = 1500 WHERE id = 'dddddddd-dddd-dddd-dddd-dddddddddddd';

-- Seed ticket activities
INSERT INTO ticket_activities (ticket_id, action, old_value, new_value)
VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Status changed', 'NEW', 'IN_PROGRESS'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Status changed', 'NEW', 'WAITING_FOR_PARTS'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Status changed', 'NEW', 'COMPLETED');
