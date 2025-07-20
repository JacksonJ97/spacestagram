import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import router from "routes/index";
import { PORT, APP_ORIGIN } from "constants/env";
import errorHandler from "middlewares/error-handler";

const app = express();

app.use(express.json());
app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use(cookieParser());

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
