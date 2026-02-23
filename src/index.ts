import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import previewEditiorRoutes from "./routes/routes"

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());


app.use("/api/project", previewEditiorRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});