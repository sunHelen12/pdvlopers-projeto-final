const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3001",
  credentials: true
}));

app.use(express.json({ limit: '10mb' })); // Limitar tamanho do payload
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Algo deu errado!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));