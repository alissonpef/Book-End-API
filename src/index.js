const express = require("express");
const bookRoutes = require("./routes/book.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Book-End API is running! 🚀</h1>");
});

app.use("/api", bookRoutes);
app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
