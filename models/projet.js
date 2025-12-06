const mongoose = require('mongoose');
//hedha modele de schema de projet
const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true }, // nom du projet
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['en cours', 'terminé', 'en pause'], default: 'en cours' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
