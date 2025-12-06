const express = require("express");
const router = express.Router();
//lenna bech naamlou routes mt3 projet
const {
  createProject,
  getMyProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projetcontroller");
const auth = require("../middlewares/authmiddlerwares");

// Créer un projet
router.post("/", auth, createProject);



// Voir mes projets
router.get("/", auth, getMyProjects);

// Mettre à jour un projet
router.put("/:id", auth, updateProject);

// Supprimer un projet
router.delete("/:id", auth, deleteProject);

module.exports = router;