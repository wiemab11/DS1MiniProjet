require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//hedha becch naayto les routes
const authRoute = require('./ROUTES/authroute');
const projetRoute = require('./ROUTES/projetroute');
const taskRoute = require('./ROUTES/taskroute');
const app = express();


app.use(cors());
app.use(express.json());

//houni ntesti connexion maa mongodb
mongoose.connect('mongodb://localhost:27017/PROJETDS1')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(" MongoDB Error:", err));


// hedouma les routes
app.use('/api/users', authRoute);
app.use('/api/projects', projetRoute);
app.use('/api/tasks', taskRoute);

// hedha test de route 
app.get('/', (req, res) => {
  res.send('API ISIDS en fonctionnement...');
});



//leenaa y9oli aala anna port ykhdem eli howa 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
