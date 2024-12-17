import express from "express";
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/blog.js";

const app = express();
const PORT = 9000;

connectToMongo();

app.use(express.json());

app.get("/", (req, res) => res.send("api running"));

app.use("/api/v1", authRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
