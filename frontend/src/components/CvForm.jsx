import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from './HeroSection';
import { ProfileSection } from './ProfileSection';
import Skills from './Skills';
import { Experience } from './Experience';
import { Education } from './Education';

function CVForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nameComplete: '',
    role: '',
    contactInfo: {
      email: '',
      phone: '',
      linkedin: '',
      otherSocials: []
    },
    profileSection: {
      titleOfProfileSection: '',
      descriptionOfProfileSection: ''
    },
    skillsSection: {
      titleOfSkillsSection: '',
      descriptionOfSkillsSection: []
    },
    experienceSection: {
      titleOfExperienceSection: '',
      descriptionOfExperienceSection: [
        {
          titleOfExperience: '',
          descriptionOfExperience: '',
          yearsOfExperience: ''
        }
      ]
    } ,
    educationSection: {
      title: '',
      descriptionDeEducacion: [
        {
          titleOfEducation: '',
          institutionEducation: '',
          yearsOfEducation: ''
        }
      ]
    }


  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevState) => {
      const newState = { ...prevState };
    
      const sectionMappings = {
        contactInfo: ['email', 'phone', 'linkedin'],
        profileSection: ['titleOfProfileSection', 'descriptionOfProfileSection'],
        skillsSection: ['titleOfSkillsSection', 'descriptionOfSkillsSection'],
        experienceSection: ['titleOfExperienceSection', 'descriptionOfExperienceSection'],
        educationSection: ['title', 'descriptionOfEducationSection']
    };
  
      Object.entries(sectionMappings).forEach(([section, fields]) => {
        if (fields.includes(name)) {
          newState[section][name] = value;
        }
      });
  
      if (!Object.keys(sectionMappings).some(section => sectionMappings[section].includes(name))) {
        newState[name] = value;
      }
  
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
     try {
       const response = await axios.post('http://localhost:3000/createcv', formData);
       console.log(response.data);
       alert('Cv creado correctamente');
       const cvId = response.data.cvId;
       navigate(`/cv/${cvId}`);
     } catch (error) {
       console.error(error);
     }
  };

  return (
    <div>
      <h2>Minimalist CV Generator</h2>
      <form onSubmit={handleSubmit}>
        <HeroSection handleChange={handleChange} info={formData} />
        <ProfileSection handleChange={handleChange} profileInfo={formData} />
        <Skills handleChange={handleChange} skills={formData} />
        <Experience experience={formData} handleChange={handleChange} />
        <Education education={formData} handleChange={handleChange} />
        <button type="submit">Create CV</button>
      </form>
    </div>
  );
}

export default CVForm;
