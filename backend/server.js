
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const cors = require('cors');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = process.env.PORT || 3000;


//conexion a mongo
mongoose.connect('mongodb://localhost:27017/cvdb', {
    useUnifiedTopology: true,
    
}).then(() => {
    console.log("La conexión del papu")
}).catch(error => {
    console.log("Error connecting")
})

const CVSchema = new mongoose.Schema({
    nameComplete: String,
    role: String,
    contactInfo: {
        email: String,
        phone: String,
        linkedin: String,
        otherSocials: [{
            name:String,
            url:String
        }],
    },
    profileSection:{
        titleOfProfileSection: String,
        descriptionOfProfileSection: String,
    },

    skillsSection:{
        titleOfSkillsSection: String,
        descriptionOfSkillsSection: [String],
    },
    experienceSection:{
        titleOfExperienceSection: String,
        descriptionOfExperienceSection: [{
            titleOfExperience: String,
            descriptionOfExperience: String,
            yearsOfExperience: String
        }]

    },
    educationSection:{
        title: String,
        descriptionDeEducacion:[ {
            titleOfEducation: String,
            institutionEducation: String,
            yearsOfEducation: String
        }]
        
    }
});


const CV = mongoose.model('CV', CVSchema);
//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));


//Endpoints
app.post('/createCv', async (req, res) => {
    try {
      const { nameComplete, role, contactInfo, skillsSection, profileSection, experienceSection, educationSection} = req.body;
      const newCV = new CV({
        nameComplete,
        role,
        contactInfo,
        skillsSection,
        profileSection,
        experienceSection,
        educationSection,
      });
      const savedCV = await newCV.save();
      res.status(200).json({
        message: "CV creado",
        cvId: savedCV._id // Aquí se envía el ID del CV creado en la respuesta
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el CV' });
    }
  });

app.get('/getcv/:cvId', async(req, res) => {
    try {
        const cvId = req.params.cvId
        const cv = await CV.findById(cvId)

        if (!cv) {
            return res.status(404).json({message: 'No CV found'})
        }

        res.status(200).json(cv)
    } catch (error) {
        res.status(500).json({message: 'Error'})
    }
})


//Iniciar el servidor
app.listen(PORT,() => {
console.log(`Server is running in PORT ${PORT}`)
})
