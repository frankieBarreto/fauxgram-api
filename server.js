//external exports
const express = require('express');
const cors = require('cors');

// internal imports
const routes = require('./routes');

const port = process.env.PORT || 3001;
const app = express();


// middleware -JSON parsing
app.use(express.json());
app.use(cors());

// middleware - API
app.get("/", (req, res)=>{
    res.send("")
})

// Comment Routes
app.use("/api/v1/comments", routes.comments)

// Post Route
app.use("/api/v1/post", routes.post)


// Auth Routes
app.use("/api/v1/auth", routes.auth);

// User Routes
app.use("/api/v1/users", routes.user);

//connection
app.listen(port, ()=> console.log(`Server is running on port ${port}`))