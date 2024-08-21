const express = require('express');
const app = express();
const path = require("path");

const swaggerDocs = require("./util/swagger");
const { connectDB } = require('./util/db');
const routes = require('./routes/index');
const cors = require("cors");

// Middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes
app.use("/api/v1", routes);

// Connect to database
connectDB();
swaggerDocs(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
