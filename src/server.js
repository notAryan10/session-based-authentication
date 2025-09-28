import express from "express";
import session from "express-session";

const app = express();
app.use(express.json());

// Setup session middleware
app.use(
  session({
    secret: "mysecretkey", // normally from env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // secure: true only with https
  })
);

// Login route
app.post("/login", (req, res) => {
  // Write your code here

});

// Profile route (protected)
app.get("/profile", (req, res) => {
  // Write your code here

});

// Logout route
app.get("/logout", (req, res) => {
  // Write your code here

});

// Start server only if not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}

export default app;
