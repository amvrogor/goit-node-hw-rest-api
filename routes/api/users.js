const express = require("express");
const { authenticate } = require("../../middlewares");
const authControllers = require("../../controllers/auth-controllers");

const router = express.Router();

router.post("/register", authControllers.register);

router.post("/login", authControllers.login);

router.get("/current", authenticate, authControllers.getCurrent);

router.post("/logout", authenticate, authControllers.logout);

router.patch("/", authenticate, authControllers.updateSubscription);

module.exports = router;
