import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import router from "./routes";
import errorHandler from "./middlewares/error-handler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || "8000";

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
