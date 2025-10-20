-- Seed script for React 19 Actions chapter examples
-- Run this after creating the database schema

-- Insert sample users
INSERT INTO "User" (id, name, email, "createdAt", "updatedAt") VALUES
  ('user-1', 'Alice Johnson', 'alice@example.com', NOW(), NOW()),
  ('user-2', 'Bob Smith', 'bob@example.com', NOW(), NOW()),
  ('user-3', 'Carol Williams', 'carol@example.com', NOW(), NOW());

-- Insert profiles
INSERT INTO "Profile" (id, "userId", bio, preferences) VALUES
  ('profile-1', 'user-1', 'Software developer passionate about React', '{"newsletter": true, "notifications": true}'),
  ('profile-2', 'user-2', 'Designer and frontend enthusiast', '{"newsletter": false, "notifications": true}'),
  ('profile-3', 'user-3', 'Full-stack developer', '{"newsletter": true, "notifications": false}');

-- Insert products
INSERT INTO "Product" (id, name, description, price, category, images, "createdAt", "updatedAt") VALUES
  ('prod-1', 'Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 199.99, 'electronics', ARRAY['/placeholder.svg?height=400&width=400'], NOW(), NOW()),
  ('prod-2', 'Smart Watch', 'Feature-rich smartwatch with health tracking', 299.99, 'electronics', ARRAY['/placeholder.svg?height=400&width=400'], NOW(), NOW()),
  ('prod-3', 'Laptop Stand', 'Ergonomic aluminum laptop stand', 49.99, 'accessories', ARRAY['/placeholder.svg?height=400&width=400'], NOW(), NOW()),
  ('prod-4', 'Mechanical Keyboard', 'RGB mechanical keyboard with custom switches', 149.99, 'electronics', ARRAY['/placeholder.svg?height=400&width=400'], NOW(), NOW()),
  ('prod-5', 'USB-C Hub', 'Multi-port USB-C hub with HDMI and ethernet', 79.99, 'accessories', ARRAY['/placeholder.svg?height=400&width=400'], NOW(), NOW()),
  ('prod-6', 'Webcam', '4K webcam with auto-focus and noise reduction', 129.99, 'electronics', ARRAY['/placeholder.svg?height=400&width=400'], NOW(), NOW());

-- Insert posts
INSERT INTO "Post" (id, title, content, category, "favoriteCount", "createdAt", "updatedAt", "authorId") VALUES
  ('post-1', 'Getting Started with React 19', 'React 19 introduces powerful new features...', 'tutorial', 42, NOW(), NOW(), 'user-1'),
  ('post-2', 'Server Actions Explained', 'Server Actions simplify server interactions...', 'guide', 38, NOW(), NOW(), 'user-2'),
  ('post-3', 'Optimistic UI Patterns', 'Learn how to implement optimistic updates...', 'tutorial', 55, NOW(), NOW(), 'user-1');

-- Insert reviews
INSERT INTO "Review" (id, rating, content, "createdAt", "productId") VALUES
  ('review-1', 5, 'Excellent sound quality!', NOW(), 'prod-1'),
  ('review-2', 4, 'Great product, slightly expensive', NOW(), 'prod-1'),
  ('review-3', 5, 'Best smartwatch I have owned', NOW(), 'prod-2'),
  ('review-4', 4, 'Solid build quality', NOW(), 'prod-3'),
  ('review-5', 5, 'Perfect for my setup', NOW(), 'prod-4');

-- Insert variants
INSERT INTO "Variant" (id, name, sku, "productId") VALUES
  ('var-1', 'Black', 'WH-BLK-001', 'prod-1'),
  ('var-2', 'White', 'WH-WHT-001', 'prod-1'),
  ('var-3', 'Silver', 'SW-SLV-001', 'prod-2'),
  ('var-4', 'Space Gray', 'SW-GRY-001', 'prod-2');

-- Insert notifications
INSERT INTO "Notification" (id, content, read, "createdAt") VALUES
  ('notif-1', 'Welcome to the platform!', false, NOW()),
  ('notif-2', 'Your profile has been updated', true, NOW()),
  ('notif-3', 'New comment on your post', false, NOW());
