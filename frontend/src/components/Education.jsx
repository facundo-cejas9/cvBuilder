import React, { useState } from "react";

export const Education = ({ education, handleChange }) => {
  const [inputCount, setInputCount] = useState(1); // Inicializa inputCount en 1

  const handleAddEducation = (e) => {
    e.preventDefault();
    setInputCount(inputCount + 1);

    // Agregar un nuevo objeto de educación vacío al formulario
    handleChange({
      target: {
        name: "educationSection",
        value: {
          ...education.educationSection,
          descriptionDeEducacion: [
            ...education.educationSection.descriptionDeEducacion,
            {
              titleOfEducation: "",
              institutionEducation: "",
              yearsOfEducation: "",
            },
          ],
        },
      },
    });
  };

  const handleDelteEducation = (e) => {
    e.preventDefault();
    if (inputCount <= 1) {
      alert("Se necesita al menos 1 campo de educación");
      return;
    }
    setInputCount(inputCount - 1);
    // Eliminar el último objeto de educación del formulario
    handleChange({
      target: {
        name: "educationSection",
        value: {
          ...education.educationSection,
          descriptionDeEducacion: education.educationSection.descriptionDeEducacion.slice(
            0,
            -1
          ),
        },
      },
    });
  };

  const handleEducationChange = (field, index, value) => {
    const updatedEducation = [
      ...education.educationSection.descriptionDeEducacion,
    ];

    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };

    handleChange({
      target: {
        name: "educationSection",
        value: {
          ...education.educationSection,
          descriptionDeEducacion: updatedEducation,
        },
      },
    });
  };

  const renderEducationSection = () => {
    const inputsOfEducation = [];
    for (let i = 0; i < inputCount; i++) {
      inputsOfEducation.push(
        <div className="sectionEducation" key={i}>
          <div className="infoEducation">
          <input
            className="inputEducation"
            placeholder="Carrera, curso o titulo"
            type="text"
            name={`titleOfEducation_${i}`}
            value={education.educationSection.descriptionDeEducacion[i].titleOfEducation}
            onChange={(e) => handleEducationChange("titleOfEducation", i, e.target.value)}
          />
          -
          <input
          className="inputEducation"
            type="text"
            placeholder="Institución"
            name={`institutionEducation_${i}`}
            value={education.educationSection.descriptionDeEducacion[i].institutionEducation}
            onChange={(e) => handleEducationChange("institutionEducation", i, e.target.value)}
          />
          -

          <input
          className="inputEducation"
            type="text"
            placeholder="Cursando o terminada"
            name={`yearsOfEducation_${i}`}
            value={education.educationSection.descriptionDeEducacion[i].yearsOfEducation}
            onChange={(e) => handleEducationChange("yearsOfEducation", i, e.target.value)}
          />
    
          </div>
         
        </div>
      );
    }
    return inputsOfEducation;
  };

  return (
    <div>
      <h3 className="title-section">
          <input
            className="inputTitle"
            placeholder="Estudios, formación"
            type="text"
            name="title"
            value={education.educationSection.title || ""}
            onChange={handleChange}
          />
        </h3>
        <div className="barra"></div>
      {/* <div className="barra"></div>
      <input
        type="text"
        name="title"
        value={education.educationSection.title}
        onChange={handleChange}
      /> */}

        {renderEducationSection()}
        <div className="buttonsAdd">
          
      <button onClick={handleAddEducation}>Agregar educación</button>
      {
        inputCount > 1 && (
          <button onClick={handleDelteEducation}>Borrar última educación</button>
        )
      }
      
        </div>

    </div>
  );
};
