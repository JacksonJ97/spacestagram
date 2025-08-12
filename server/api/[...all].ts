import path from "path";
import { register } from "tsconfig-paths";

register({
  baseUrl: path.join(__dirname, ".."),
  paths: {
    "constants/*": ["src/constants/*"],
    "controllers/*": ["src/controllers/*"],
    "db/*": ["src/db/*"],
    "middlewares/*": ["src/middlewares/*"],
    "routes/*": ["src/routes/*"],
    "utils/*": ["src/utils/*"],
  },
});

import app from "../src/app";

export default app;
