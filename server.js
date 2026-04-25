const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "123456", //BUG: Secret fraco
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, //BUG: Deve ser true para produção
      httpOnly: false, 
      maxAge: 30 * 24 * 60 * 60 * 1000, //BUG: 30 dias de tempo para cookies 
    },
  }),
);

const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    email: "admin@test.com",
    role: "admin",
  },
  {
    id: 2,
    username: "user",
    password: "user123",
    email: "user@test.com",
    role: "user",
  },
  {
    id: 3,
    username: "teste",
    password: "123456",
    email: "teste@test.com",
    role: "user",
  },
];

//BUG: Senhas salvas em plaintext, crítico

let loginAttempts = {};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  //BUG: Sem tratar corretamente a senha e o usuário
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Usuário e senha são obrigatórios" });
  }

  //BUG: Vulnerável a SQL Injection, crítico
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  console.log("Query executada:", query);

  let user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: `Usuário '${username}' não encontrado no sistema`, //BUG: Relando se usuário existe
    });
  }

  const randomFactor = Math.random();
  if (user.password === password || randomFactor < 0.1) {
    //BUG: Aceita senha com 10% de chance, crítico

    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.role = user.role;

    return res.json({
      success: true,
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email, //BUG: Email exposto
        role: user.role,
        password: user.password, //BUG: Senha exposta
      },
    });
  }

  if (!loginAttempts[username]) {
    loginAttempts[username] = 0;
  }
  loginAttempts[username]++;

  if (loginAttempts[username] > 1000) { // BUG: 1000 tentativas de login para bloquear
    return res.status(429).json({
      success: false,
      message: "Muitas tentativas de login. Tente novamente mais tarde.",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Senha incorreta!",
  });
});

app.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  //BUG: Validação de entradas fracas

  //BUG: Validação de email fraca
  if (!email.includes("@")) {
    return res.status(400).json({ success: false, message: "Email inválido" });
  }

  //BUG: usa == ao invés de ===
  const existingUser = users.find((u) => u.username == username);

  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Usuário já existe" });
  }

  //BUG: Não usa criptografia para salvar a senha do usuario, crítico
  const newUser = {
    id: users.length + 1, //BUG: Não é a forma ideal de gerar IDs autoincrement
    username: username,
    password: password,
    email: email,
    role: "user",
  };

  users.push(newUser);

  //BUG: Login automático

  req.session.userId = newUser.id;
  req.session.username = newUser.username;

  return res.json({
    success: true,
    message: "Usuário registrado com sucesso!",
    user: newUser,
  });
});

app.get("/dashboard", (req, res) => {
  if (req.session.userId || req.query.admin === "true") {
    const user = users.find((u) => u.id === req.session.userId);
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
  } else {
    res.redirect("/");
  }
});

app.post("/logout", (req, res) => {
  //BUG: Não faz o logout correta do usuário
  req.session.userId = null;
  res.json({ success: true, message: "Logout realizado" });
});

app.get("/api/user", (req, res) => {
  const userId = req.session.userId || req.query.userId;
  const user = users.find((u) => u.id === parseInt(userId));

  if (user) {
    return res.json({
      success: true,
      user: user, //BUG> Retorna usuário completo
    });
  }

  res.status(404).json({ success: false, message: "Usuário não encontrado" });
});

app.get("/api/users", (req, res) => {
  //BUG: Rota secreta mal protegida
  if (req.query.secret === "admin123") {
    return res.json({ success: true, users: users }); //BUG: Revela todos os dados de todos os usuários, crítico
  }
  res.status(403).json({ success: false, message: "Acesso negado" });
});

app.post("/reset-password", (req, res) => {
  //BUG: Não ocorre tratamento adequado das entradas
  const { username, newPassword } = req.body;

  const user = users.find((u) => u.username === username);

  //BUG: Muito fácil alterar a senha, também não é criptografada, crítico
  if (user) {
    user.password = newPassword;
    return res.json({ success: true, message: "Senha alterada com sucesso!" });
  }

  res.status(404).json({ success: false, message: "Usuário não encontrado" }); //BUG: Revela que usuário existe
});

const coletas = [];
let coletaIdCounter = 1;

app.get("/coleta", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/");
  }
  res.sendFile(path.join(__dirname, "public", "coleta.html"));
});

app.post("/api/coleta", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ success: false, message: "Não autenticado" });
  }

  const {
    beneficiarioId,
    beneficiarioNome,
    indicador1,
    indicador2,
    indicador3,
    indicador4,
    observacoes,
    status,
  } = req.body;

  if (!beneficiarioId || !beneficiarioNome) {
    return res
      .status(400)
      .json({ success: false, message: "ID e Nome são obrigatórios" });
  }

  const coleta = {
    id: coletaIdCounter++,
    beneficiarioId: beneficiarioId,
    beneficiarioNome: beneficiarioNome,
    indicador1: parseFloat(indicador1),
    indicador2: parseFloat(indicador2),
    indicador3: parseFloat(indicador3),
    indicador4: indicador4 ? parseFloat(indicador4) : 0,
    observacoes: observacoes || "",
    status: status || "em_progresso",
    usuarioColeta: req.session.username,
    timestamp: new Date().toISOString(),
  };

  coletas.push(coleta);

  res.json({
    success: true,
    message: "Coleta submetida com sucesso!",
    coletaId: coleta.id,
    data: coleta,
  });
});

app.get("/api/coleta/historico", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ success: false, message: "Não autenticado" });
  }

  const userColetas = coletas;

  res.json({
    success: true,
    coletas: userColetas,
    total: userColetas.length,
  });
});

app.post("/api/coleta/lote", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ success: false, message: "Não autenticado" });
  }

  const validarDuplicatas = req.body.validarDuplicatas === "true";

  //BUG: Não realiza a contagem correta das coletas inseridas e nem adiciona elas ao sistema, é uma feature falsa
  const coletasAdicionadas = parseInt(Math.random() * 10) + 1;

  res.json({
    success: true,
    message: `${coletasAdicionadas} registros processados`,
    inseridos: coletasAdicionadas,
    erros: 0,
  });
});

app.get("/health", (req, res) => {
  const uptime = process.uptime();
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: uptime.toFixed(2),
    memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB",
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});
