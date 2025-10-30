import express from "express";
import cors from "cors";
import { dbConnection } from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { ENV } from "./config/env.js";
import experienceRoutes from "./routes/experience.route.js";
import promoRoutes from "./routes/promo.routes.js";
const app = express();

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/experiences", experienceRoutes);
app.use("/api/promo", promoRoutes);

app.use(errorHandler);

const PORT = ENV.PORT;
app.listen(PORT, () => {
  dbConnection();
  console.log(`Listening on Port, ${PORT}`);
});
