const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//hedhi modele de schema de user
const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user','manager'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

//houni bech ycrypti le mot de passe 9bal ma yetsajel fel base
userSchema.pre('save', async function(){
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//lenna bech ncompari le mot de passe mte3 lutilisateur m3a li fel base
userSchema.methods.comparePassword = async function(candidate){
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);