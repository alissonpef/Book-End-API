const express = require("express");
const bookRoutes = require("./routes/book.routes");
const authRoutes = require("./routes/auth.routes");
const loanRoutes = require("./routes/loan.routes");

const app = express();

app.use("/api", bookRoutes);
app.use("/api", loanRoutes);
app.use(authRoutes);
