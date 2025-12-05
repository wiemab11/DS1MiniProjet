const Task = require("../models/task");
const Project = require("../models/projet");

// ------------------ CREATE TASK ------------------
const createTask = async (req, res) => {
  try {
    const { title, status } = req.body;
    const projectId = req.params.projectId;

    // vérifier si projet appartient à l'utilisateur
    const project = await Project.findOne({ _id: projectId, user: req.user.id });
    if (!project) return res.status(404).json({ message: "Projet introuvable" });

    const task = await Task.create({
      title,
      status,
      project: projectId,
    });

    res.status(201).json({ message: "Tâche créée", task });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

// ------------------ GET TASKS OF A PROJECT ------------------
const getProjectTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

// ------------------ UPDATE TASK ------------------
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });

    if (!task) return res.status(404).json({ message: "Tâche introuvable" });

    res.status(200).json({ message: "Tâche mise à jour", task });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

// ------------------ DELETE TASK ------------------
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ message: "Tâche introuvable" });

    res.status(200).json({ message: "Tâche supprimée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

module.exports = { createTask, getProjectTasks, updateTask, deleteTask };
