import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);

export { app };
