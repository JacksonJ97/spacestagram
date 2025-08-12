import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import router from "routes/index";
import { PORT, APP_ORIGIN } from "constants/env";
import errorHandler from "middlewares/error-handler";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use((_req, _res, next) => {
  console.log("Request URL:", _req.url);
  next();
});
app.use(process.env.VERCEL ? "" : "/api", router);
app.get(process.env.VERCEL ? "/health" : "/api/health", (req, res) =>
  res.json({ ok: true })
);

app.use(errorHandler);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
