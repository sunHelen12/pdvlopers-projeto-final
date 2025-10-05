// src/server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const swaggerSetup = require("./config/swagger");

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Helpers ----------
function requireOne(...paths) {
  for (const p of paths) {
    try { return require(p); } catch (_) {}
  }
  throw new Error(`Não foi possível carregar nenhum dos módulos: ${paths.join(", ")}`);
}

// ---------- Segurança / Infra ----------
app.use(helmet()); // se o Swagger reclamar de CSP, troque por: helmet({ contentSecurityPolicy: false })
app.use(compression());

// CORS (suporta múltiplas origens via env FRONTEND_URL=dom1,dom2)
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3001")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS || `${15 * 60 * 1000}`, 10),
  max: Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100", 10),
  message: "Muitas requisições, tente novamente mais tarde.",
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ---------- Swagger ----------
swaggerSetup(app);

// ---------- Healthcheck ----------
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ---------- Rotas ----------
const authRoutes = requireOne("./routes/authRoutes", "./routes/auth.routes"); // compat
const clientRoutes = require("./routes/clientRoutes");
const loyaltyRoutes = require("./routes/loyaltyRoutes");
const promotionRoutes = require("./routes/promotionRoutes");
const financialRoutes = require("./routes/financialRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/loyalty", loyaltyRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/financial", financialRoutes);

// ---------- Erros ----------
app.use(notFound);
app.use(errorHandler);

// ---------- Start ----------
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em http://localhost:${PORT}/api-docs`);
});

module.exports = app;
