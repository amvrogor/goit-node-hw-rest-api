const express = require("express");
const { authenticate, upload } = require("../../middlewares");
const authControllers = require("../../controllers/auth-controllers");

const router = express.Router();

router.post("/register", upload.single("avatarURL"), authControllers.register);

router.get("/verify/:verificationToken", authControllers.verify);

router.post("/verify", authControllers.resendVerifyEmail);

router.post("/login", authControllers.login);

router.get("/current", authenticate, authControllers.getCurrent);

router.post("/logout", authenticate, authControllers.logout);

router.patch("/", authenticate, authControllers.updateSubscription);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  authControllers.updateAvatar
);

module.exports = router;
