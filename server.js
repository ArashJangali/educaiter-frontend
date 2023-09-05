// const PORT = process.env.PORT || 8000;
// const express = require("express");
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const cors = require("cors");
// require("dotenv").config();
// const authenticateToken = require('./server/middleware/authenticateToken')
// const mongoose = require("mongoose");
// const connectDB = require('./server/config/db')
// connectDB()
// const stripeRoute = require('./server/routes/stripeRoute');
// const pricingRoute = require('./server/routes/pricingRoute')
// const cookieParser = require('cookie-parser')



// const rateLimit = require("express-rate-limit");


// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   });


// const app = express();
// app.use(express.json());

// app.use(cors({
//   origin: function (origin, callback) {
//     if (origin && origin.match(/educaiter\.vercel\.app$/)) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   credentials: true,
// }));



// app.use((req, res, next) => {
//   res.setHeader('Content-Security-Policy', "default-src 'self'");
//   res.setHeader('X-Frame-Options', 'DENY');
//   res.setHeader('X-XSS-Protection', '1; mode=block');
//   res.setHeader('X-Content-Type-Options', 'nosniff');
//   next();
// });


// const checkApiUsage = async (req, res, next) => {
//     const userId = req.user?._id;
  
//     // Find the user in the database
//     const user = await User.findById(userId);
  
//     // Check if the user has exceeded their limit
//     if (user.apiUsage >= user.apiLimit) {
//       return res.status(403).json({ message: "API usage limit reached. Please make a payment to continue using the service." });
//     }
  
//     // If not, increment the user's API usage
//     user.apiUsage += 1;
//     await user.save();
  
//     next();
//   };


// app.use(cookieParser());

// app.use(stripeRoute);

// app.use(pricingRoute)

// app.get('/me', authenticateToken, limiter, (req, res) => {
//   const { age, email, interests, learningStyle, name, picture, subjectsOfInterest, _id, subscription } = req.user
//   const { planType, sessionId } = subscription
//   res.json({ age, email, interests, learningStyle, name, picture, subjectsOfInterest, planType, sessionId, _id });
// });


// const apiRouter = require("./server/routes/api");
// const userRouter = require("./server/routes/userRoutes");
// const assessmentRoutes = require('./server/routes/assessmentRoutes');
// const recommendationRoutes = require('./server/routes/recommendationRoutes');


// app.use('/api/assessment', assessmentRoutes);
// app.use('/api/recommendation', recommendationRoutes);
// app.use("/api/api", authenticateToken, limiter, apiRouter);
// app.use("/api", userRouter);

// app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`));