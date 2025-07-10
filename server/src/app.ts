import dotenv from "dotenv";
import express from "express";
import router from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || "3001";

app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
