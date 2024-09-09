import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./routes/user";
import errorMiddleware from "./utils/errorMiddleware";
import "./setup/mongoose";

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import "./setup/passport";

app.use("/api", userRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
