// // backend/Routes/AuthRoute.js

const express = require("express");
const router = express.Router();
const { signup, login, userVerification} = require("../Controllers/AuthController");

// // POST /signup route
router.post("/signup", signup);

// // POST /login route
router.post("/login", login);

// // POST / userverification
router.post("/",userVerification)

module.exports = router;
