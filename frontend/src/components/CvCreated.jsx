import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function CvCreated() {
  const { cvId } = useParams();
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    const fetchCVData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/getcv/${cvId}`);
        setCvData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCVData();
  }, [cvId]);

  return (
    <div>
      {cvData && (
        <div>
          <h1 className="nameComplete">
            {cvData.nameComplete}
          </h1>
          <h2 className="role">{cvData.role}</h2>
          <div className="contact">
            <span>
              Email:{" "}
              <span className="contact-info">{cvData.contactInfo.email}</span>{" "}
            </span>
            <span>
              Teléfono:{" "}
              <span className="contact-info">{cvData.contactInfo.phone}</span>{" "}
            </span>
            <span>
              Linkedin:{" "}
              <span className="contact-info">
                <a href={cvData.contactInfo.linkedin}>
                  {cvData.contactInfo.linkedin}
                </a>
              </span>{" "}
            </span>
          </div>
          <div className="barra"></div>

          <h3 className="title-section">
            {cvData.profileSection.titleOfProfileSection}
          </h3>
          <div className="barra"></div>
          <div>
            <p className="description-section">
              {cvData.profileSection.descriptionOfProfileSection}
            </p>
          </div>

          <div className="barra"></div>
          <h3 className="title-section">
            {cvData.skillsSection.titleOfSkillsSection}
          </h3>
          <div className="barra"></div>

          <div className="skillSection">
            {cvData.skillsSection.descriptionOfSkillsSection.map(
              (skill, index) => (
                <div key={index}>
                  <p className="description-section" key={index}>
                    • {skill}
                  </p>
                </div>
              )
            )}
          </div>

          <div className="barra"></div>
          {cvData.experienceSection &&
            cvData.experienceSection.descriptionOfExperienceSection && (
              <div className="experience">
                <h3 className="title-section">
                  {cvData.experienceSection.titleOfExperienceSection}
                </h3>
                <div className="barra"></div>
                {cvData.experienceSection.descriptionOfExperienceSection.map(
                  (experience, index) => (
                    <div key={index}>
                      <h4 className="title-experience">
                        {experience.titleOfExperience}
                      </h4>
                      <p className="descriptionExperienceSection">
                        {experience.descriptionOfExperience}
                      </p>
                      <p className="years-experience">
                        {experience.yearsOfExperience}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}

          <div className="barra"></div>
          {cvData.educationSection &&
            cvData.educationSection.descriptionDeEducacion && (
              <div>
                <h3 className="title-section">
                  {cvData.educationSection.title}
                </h3>
                <div className="barra"></div>
                <div className="sectionEducation">
                  {cvData.educationSection.descriptionDeEducacion.map(
                    (education, index) => (
                      <div className="infoEducation" key={index}>
                        <h4 className="titleEducation">
                          • {education.titleOfEducation} -
                        </h4>
                        <p className="descriptionOfEducation">
                          {education.institutionEducation} -
                        </p>
                        <h4 className="descriptionOfEducation">
                          ({education.yearsOfEducation})
                        </h4>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
        </div>
      )}
      
    </div>
  );
}

export default CvCreated;
