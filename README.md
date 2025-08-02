# Clean Food - Food Delivery Website 🍕

Link for Demo - https://food-delivery-website-3-u43q.onrender.com/

A full-stack food delivery web application built with React.js frontend, Node.js/Express backend, and MongoDB database. The platform includes customer ordering, admin management, and secure payment processing.

## 🌟 Features

### Customer Features
- Browse food menu with categories
- Add items to cart and manage quantities
- User authentication (register/login)
- Secure checkout with Stripe payment integration
- Order tracking and history
- Responsive design for mobile and desktop

### Admin Features
- Admin dashboard for order management
- Add, edit, and delete food items
- View and manage customer orders
- Upload food images
- Sales analytics and reporting

### Technical Features
- JWT-based authentication
- File upload for food images
- CORS enabled for cross-origin requests
- Environment-based configuration
- RESTful API design

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **ESLint** - Code linting

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **Stripe** - Payment processing
- **CORS** - Cross-origin resource sharing

### Admin Panel
- **React.js** - UI framework
- **Vite** - Build tool
- **React Router DOM** - Routing
- **React Toastify** - Notifications
- **Axios** - API communication

## 📁 Project Structure

```
clean-food/
├── 📁 frontend/                 # Customer-facing React application
│   ├── 📁 src/                  # Source code
│   ├── 📁 public/               # Static assets
│   ├── 📄 package.json          # Frontend dependencies
│   ├── 📄 vite.config.js        # Vite configuration
│   ├── 📄 eslint.config.js      # ESLint configuration
│   └── 📄 index.html            # Main HTML file
│
├── 📁 backend/                  # Node.js/Express server
│   ├── 📁 config/               # Database configuration
│   ├── 📁 controllers/          # Route controllers
│   ├── 📁 middleware/           # Custom middleware
│   ├── 📁 models/               # MongoDB models
│   ├── 📁 routes/               # API routes
│   ├── 📁 uploads/              # Uploaded files storage
│   ├── 📄 server.js             # Main server file
│   ├── 📄 package.json          # Backend dependencies
│   ├── 📄 .env                  # Environment variables
│   └── 📄 createDefaultAdmin.js # Admin setup script
│
├── 📁 admin/                    # Admin panel React application
│   ├── 📁 src/                  # Source code
│   ├── 📁 public/               # Static assets
│   ├── 📄 package.json          # Admin dependencies
│   ├── 📄 vite.config.js        # Vite configuration
│   └── 📄 index.html            # Admin HTML file
│
├── 📁 backup/                   # Project backups
├── 📄 .gitignore               # Git ignore rules
└── 📄 README.md                # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clean-food
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   PORT=4000
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Admin Panel Setup**
   ```bash
   cd ../admin
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run server
   ```
   Server will run on `http://localhost:4000`

2. **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Start the Admin Panel**
   ```bash
   cd admin
   npm run dev
   ```
   Admin panel will run on `http://localhost:5174`

## 📋 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login

### Food Management
- `GET /api/food/list` - Get all food items
- `POST /api/food/add` - Add new food item (Admin)
- `POST /api/food/remove` - Remove food item (Admin)

### Cart Management
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `POST /api/cart/get` - Get user's cart

### Order Management
- `POST /api/order/place` - Place new order
- `POST /api/order/verify` - Verify payment
- `POST /api/order/userorders` - Get user orders
- `GET /api/order/list` - Get all orders (Admin)
- `POST /api/order/status` - Update order status (Admin)

## 🔧 Configuration

### Environment Variables
The backend requires the following environment variables:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `STRIPE_SECRET_KEY` - Stripe payment gateway secret
- `PORT` - Server port (default: 4000)

### CORS Configuration
The backend is configured to accept requests from:
- Development: `http://localhost:5173`
- Production: `https://food-delivery-website-3-u43q.onrender.com`

## 🗄️ Database Schema

### User Model
- `name` - User's full name
- `email` - User's email (unique)
- `password` - Hashed password
- `cartData` - User's cart items

### Food Model
- `name` - Food item name
- `description` - Food description
- `price` - Item price
- `image` - Image filename
- `category` - Food category

### Order Model
- `userId` - Reference to user
- `items` - Array of ordered items
- `amount` - Total order amount
- `address` - Delivery address
- `status` - Order status
- `date` - Order date
- `payment` - Payment status

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Input validation with validator
- CORS protection
- File upload restrictions
- Environment variable protection

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to platforms like Heroku, Railway, or Render
3. Ensure MongoDB connection is configured

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or GitHub Pages
3. Update API endpoints to point to production backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for food lovers everywhere!**
