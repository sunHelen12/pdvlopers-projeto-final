const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/users");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validações de entrada
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Senha deve ter pelo menos 6 caracteres" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email inválido" });
    }

    // Verificar se o usuário já existe
    const userExists = await UserModel.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    // Criar hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário no banco
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ 
      message: "Usuário registrado com sucesso.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

exports.login = async (req, res) => {
  try { 
    const { email, password } = req.body;

    // Validações de entrada
    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    // Buscar usuário no banco
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha inválida." });
    }

    // Gerar tokens
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      { id: user.id }, 
      process.env.JWT_REFRESH_SECRET, 
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );

    res.json({ 
      token, 
      refreshToken,
      message: "Login bem-sucedido.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

exports.refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token ausente" });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newToken = jwt.sign(
      { id: payload.id, email: payload.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.json({ token: newToken });
  } catch (err) {
    res.status(401).json({ message: "Refresh token inválido" });
  }
};

const { sendRecoveryEmail } = require("../utils/email");

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email é obrigatório" });
    }

    // Buscar usuário no banco
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Gerar token de recuperação
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const link = `http://localhost:3000/reset-password/${token}`;

    // Enviar email
    await sendRecoveryEmail(email, link);
    res.json({ message: "Link de recuperação enviado (simulado)." });
  } catch (error) {
    console.error("Erro na recuperação de senha:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// Nova rota para obter dados do usuário logado
exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};