import "reflect-metadata";
import express from "express";
import "express-async-errors";
import userRoutes from "./routes/user.routes";
import loginRoutes from "./routes/login.routes";
import categoriesRoutes from "./routes/categories.routes";
import propertiesRoutes from "./routes/properties.routes";
import schedulesRoutes from "./routes/schedules.routes";
import handleErrorMiddleware from "./middlewares/errorHandling.middleware";

const app = express();

app.use(express.json());

app.use("/users/", userRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);
app.use("/properties", propertiesRoutes);
app.use("/schedules", schedulesRoutes);

app.use(handleErrorMiddleware);

export default app;
