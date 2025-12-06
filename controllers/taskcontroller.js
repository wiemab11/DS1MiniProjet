const Task = require("../models/task");
const Project = require("../models/projet");

//hedha bech naaml creation de task
const createTask = async (req, res) => {
  try {
    const { title, status } = req.body;
    const projectId = req.params.projectId;

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

//lhne bech njibli tasks mt3 projet moayen
const getProjectTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

//lena bech naaml update lil task
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

//lena bech naaml delete lil task
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
//nexpoter les fonction eli teb3ine lprojet
module.exports = { createTask, getProjectTasks, updateTask, deleteTask };
