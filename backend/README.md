# NuCoffee Backend

A Node.js/Express backend for the NuCoffee miniapp with CRUD operations for users, items, and orders, plus Telegram bot integration for admin notifications.

## Features

- **User Management**: CRUD operations for users
- **Item Management**: CRUD operations for coffee products
- **Order Management**: Create and read orders with status tracking
- **Telegram Integration**: Automatic notifications to admin via Telegram bot
- **Authentication**: JWT-based authentication with admin/user roles
- **Stock Management**: Automatic stock updates when orders are placed

## Setup

### Prerequisites

- Node.js 20.11.0 or higher
- MongoDB database
- Telegram bot token (optional, for admin notifications)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/nucoffee

# JWT Secret
JWT_SECRET=your_jwt_secret_here

# Telegram Bot Configuration (optional)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_ADMIN_CHAT_ID=your_admin_chat_id_here

# Server Configuration
PORT=3001

# AWS S3 (if using for image uploads)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_s3_bucket_name
```

3. Start the development server:
```bash
npm run start:dev
```

## API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - User login

### Users (Admin Only)
- `GET /users` - Get all users with pagination and filters
- `GET /users/search` - Search users by name, email, or phone
- `GET /users/stats` - Get user statistics
- `DELETE /users/:id` - Delete user
- `PATCH /users/:id/deactivate` - Deactivate user
- `PATCH /users/:id/reactivate` - Reactivate user
- `POST /users/:userId/loyalty-points` - Add loyalty points
- `POST /users/:userId/spending` - Add spending amount

### Users (Authenticated)
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update current user profile
- `PUT /users/:id` - Update user profile
- `GET /users/:id` - Get user by ID
- `PUT /users/:id/password` - Change password

### Items (Public)
- `GET /items` - Get all items (with optional filters)
- `GET /items/featured` - Get featured items
- `GET /items/:id` - Get item by ID

### Items (Admin Only)
- `POST /items` - Create new item
- `PUT /items/:id` - Update item
- `DELETE /items/:id` - Delete item
- `PATCH /items/:id/stock` - Update item stock

### Orders
- `POST /orders` - Create new order (requires auth)
- `GET /orders` - Get all orders (admin only)
- `GET /orders/:id` - Get order by ID (requires auth)
- `GET /orders/user/:userId` - Get user orders (requires auth)
- `PATCH /orders/:id/status` - Update order status (admin only)
- `GET /orders/stats` - Get order statistics (admin only)

### Legacy User Routes (Compatibility)
- `POST /updateUserInfo/:id` - Update user information
- `POST /users/getCandidates` - Get top users
- `POST /users/react` - React to user (like/dislike)
- `POST /users/getMatches` - Get user matches
- `GET /users/getChats/:id` - Get user chats
- `POST /users/uploadPhoto` - Upload user photo
- `DELETE /users/deletePhoto` - Delete user photo
- `PATCH /users/:userId/hide` - Change user visibility
- `GET /users/:userId/notifications` - Get user notifications

### Chat
- `POST /getMessages` - Get chat messages
- `POST /getLastMessage` - Get last message
- `POST /send` - Send message

## Models

### User
- Authentication (email/password)
- Profile information (name, phone, avatar)
- Coffee preferences (favorite drinks, dietary restrictions, milk/sweetener preferences)
- Address management (multiple addresses with types)
- Loyalty system (points, membership levels, total spending)
- Account status (active/verified, last login)
- Notification preferences (email, push, SMS)
- Telegram integration (ID and username)
- Role-based access (user/admin)

### Item
- Product information (name, description, price)
- Category classification
- Stock management
- Featured items

### Order
- User association
- Item list with quantities
- Delivery information
- Status tracking
- Payment method

## Telegram Bot Integration

The backend automatically sends notifications to admin via Telegram when:
- New orders are placed
- Order status is updated
- Low stock alerts
- Daily summaries
- System errors

To set up Telegram notifications:
1. Create a Telegram bot using @BotFather
2. Get your bot token
3. Get your admin chat ID
4. Add these to your `.env` file

## Security

- JWT-based authentication
- Role-based access control (admin/user)
- Input validation using express-validator
- Secure password hashing with bcrypt

## Error Handling

- Comprehensive error handling for all endpoints
- Detailed error messages for debugging
- Automatic error notifications to admin via Telegram

## Development

- Hot reload with nodemon
- ES6+ syntax with ES modules
- MongoDB with Mongoose ODM
- Express.js framework 