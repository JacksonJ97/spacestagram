import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { env } from "config/env";
import router from "routes/index";
import errorHandler from "middlewares/error-handler";

const app = express();

app.set("trust proxy", 1);
app.use(express.json());
app.use(
  cors({
    origin: env.APP_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(cookieParser());

app.use("/api", router);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});
