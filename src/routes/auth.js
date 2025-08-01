const express = require("express");
const authController = require("../controllers/auth-controller");
const { ensureAuth } = require("../middlewares/auth-middleware");
const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

authRouter.get("/test", ensureAuth, (req, res) => {
  res.json({ message: `Bem-vindo, ${req.user.name}! Seu token é válido.` });
});

module.exports = authRouter;
