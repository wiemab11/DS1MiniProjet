const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};



exports.register = async (req, res) => {
  try {
    const { nom, login, password, role } = req.body;

    // Vérifier si login existe
    const exists = await User.findOne({ login });
    if (exists) return res.status(400).json({ message: "Login déjà utilisé" });

    // 🔐 Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Création utilisateur
    const newUser = await User.create({
      nom,
      login,
      password: hashedPassword,  // ← mot de passe crypté
      role: role || "user"
    });

    res.status(201).json({
      message: "Utilisateur créé",
      user: { id: newUser._id, nom, login, role: newUser.role },
      token: generateToken(newUser._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ login });
    if (!user) return res.status(400).json({ message: "Login ou mot de passe incorrect" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Login ou mot de passe incorrect" });

    res.status(200).json({
      message: "Connexion réussie",
      user: { id: user._id, nom: user.nom, login: user.login, role: user.role },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};