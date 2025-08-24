const express = require("express");
const authRoutes = require("./routes/auth.routes");
const apiRoutes = require("./routes/api.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Book-End API is running! 🚀</h1>");
});

app.use(authRoutes);
app.use("/api", apiRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
