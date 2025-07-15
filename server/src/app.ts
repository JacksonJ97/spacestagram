import cors from "cors";
import express from "express";
import router from "./routes";
import { PORT, APP_ORIGIN } from "./utils/constants";
import errorHandler from "./middlewares/error-handler";

const app = express();

app.use(express.json());
app.use(cors({ origin: APP_ORIGIN, credentials: true }));

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
