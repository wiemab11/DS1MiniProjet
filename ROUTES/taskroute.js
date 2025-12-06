const express = require("express");
const router = express.Router();
//lenna bech naamlou routes mt3 task
const {
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskcontroller");
const auth = require("../middlewares/authmiddlerwares");

// lenna bech ncréeration metaa tâche pour un projet
router.post("/:projectId", auth, createTask);

// houni bech nchoufo toutes les tâches d'un projet
router.get("/:projectId", auth, getProjectTasks);

// leena aana update  une tâche
router.put("/:id", auth, updateTask);

// o leennaa nsupprimer une tâche
router.delete("/:id", auth, deleteTask);

module.exports = router;