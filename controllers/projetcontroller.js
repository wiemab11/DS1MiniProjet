
const Project = require("../models/projet");

// hedha controller bech naamlo bih creation de projet w gestion meta3hom
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      owner: req.user.id,
    });

    res.status(201).json({ message: "Projet créé", project });
  } catch (err) {
    res.status(500).json({ message: "Erreur", error: err.message });
  }
};


//hedha bech yjibli projets mt3i
const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Erreur", error: err });
  }
};

//hedha bech naaml update lil projet
const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Projet n exsite pas" });

    res.status(200).json({ message: "Projet updated", project });
  } catch (err) {
    res.status(500).json({ message: "Erreur", error: err });
  }
};

//hedha bech naaml delete lil projet
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) return res.status(404).json({ message: "Projet introuvable" });

    res.status(200).json({ message: "Projet supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};
//exporter les fonctions
module.exports = { createProject, getMyProjects, updateProject, deleteProject };
