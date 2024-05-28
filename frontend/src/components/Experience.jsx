import React, { useState, useEffect, useRef } from "react";

export const Experience = ({ experience, handleChange }) => {
  const textAreaRefs = useRef([]);

  const [inputCount, setInputCount] = useState(
    experience.experienceSection.descriptionOfExperienceSection.length || 1
  );

  const autoResizeTextarea = (index) => {
    if (textAreaRefs.current[index]) {
      textAreaRefs.current[index].style.height = "auto";
      textAreaRefs.current[index].style.height = `${textAreaRefs.current[index].scrollHeight}px`;
    }
  };

  useEffect(() => {
    experience.experienceSection.descriptionOfExperienceSection.forEach(
      (exp, index) => {
        autoResizeTextarea(index);
      }
    );
  }, [
    experience.experienceSection.descriptionOfExperienceSection,
  ]);

  const handleAddExperience = (e) => {
    e.preventDefault();
    setInputCount(inputCount + 1);

    handleChange({
      target: {
        name: "experienceSection",
        value: {
          ...experience.experienceSection,
          descriptionOfExperienceSection: [
            ...experience.experienceSection.descriptionOfExperienceSection,
            {
              titleOfExperience: "",
              descriptionOfExperience: "",
              yearsOfExperience: "",
            },
          ],
        },
      },
    });
  };

  const handleDeleteExperience = (e) => {
    e.preventDefault();
    if (inputCount <= 1) {
      alert("Minimo necesitamos algo de tu experiencia...");
      return;
    }

    setInputCount(inputCount - 1);
    handleChange({
      target: {
        name: "experienceSection",
        value: {
          ...experience.experienceSection,
          descriptionOfExperienceSection:
            experience.experienceSection.descriptionOfExperienceSection.slice(
              0,
              -1
            ),
        },
      },
    });
  };

  const handleChangeExperience = (index, field, value) => {
    const updatedExperience = [
      ...experience.experienceSection.descriptionOfExperienceSection,
    ];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    handleChange({
      target: {
        name: "experienceSection",
        value: {
          ...experience.experienceSection,
          descriptionOfExperienceSection: updatedExperience,
        },
      },
    });

    if (field === "descriptionOfExperience") {
      autoResizeTextarea(index);
    }
  };

  const renderExperience = () => {
    const inputsOfExperience = [];
    for (let index = 0; index < inputCount; index++) {
      const experienceData = experience.experienceSection.descriptionOfExperienceSection[index] || {
        titleOfExperience: "",
        descriptionOfExperience: "",
        yearsOfExperience: "",
      };

      inputsOfExperience.push(
        <div className="experience" key={index}>
          <input
            className="titleExperienceInput"
            placeholder="Ej: Frontend developer"
            type="text"
            name={`titleOfExperience_${index}`}
            value={experienceData.titleOfExperience}
            onChange={(e) =>
              handleChangeExperience(index, "titleOfExperience", e.target.value)
            }
          />
          <textarea
            ref={(el) => textAreaRefs.current[index] = el}
            className="descriptionTextAreaExperience"
            type="text"
            placeholder="Descripcion de que hiciste en ese trabajo..."
            name="descriptionOfExperience"
            value={experienceData.descriptionOfExperience}
            onChange={(e) =>
              handleChangeExperience(
                index,
                "descriptionOfExperience",
                e.target.value
              )
            }
          />
          <input
            className="yearsOfExperienceInput"
            type="text"
            placeholder="Años trabajando en la empresa o si actualmente trabajas ahí.."
            name="yearsOfExperience"
            value={experienceData.yearsOfExperience}
            onChange={(e) =>
              handleChangeExperience(
                index,
                "yearsOfExperience",
                e.target.value
              )
            }
          />
        </div>
      );
    }
    return inputsOfExperience;
  };

  return (
    <>
      <div className="barra"></div>
      <div className="experience">
        <h3 className="title-section">
          <input
            className="inputTitle"
            placeholder="Experience"
            type="text"
            name="titleOfExperienceSection"
            value={experience.experienceSection.titleOfExperienceSection || ""}
            onChange={handleChange}
          />
        </h3>
        <div className="barra"></div>
        {renderExperience()}
      </div>
      <div className="buttonsAdd">
        <button onClick={handleAddExperience}>Agregar Experiencia</button>
       {
        inputCount > 1 && (
          <button onClick={handleDeleteExperience}>Borrar última experiencia</button>
        )
       }
      </div>
      <div className="barra"></div>
    </>
  );
};
