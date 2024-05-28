import React, { useState } from "react";

export const Skills = ({ skills, handleChange }) => {
  const [inputCount, setInputCount] = useState(
    skills.skillsSection.descriptionOfSkillsSection.length + 1
  );

  const handleAddSkill = () => {
    if (inputCount >= 10) {
      alert("Máximo 10 skills");
      return;
    }
    setInputCount(inputCount + 1);
  };

  const handleDeleteSkill = () => {
    if (inputCount <= 1) {
      alert("Minimo se necesita 1 skill");
      return;
    }
    setInputCount(inputCount - 1);
    console.log(inputCount);
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills.skillsSection.descriptionOfSkillsSection];
    updatedSkills[index] = value;
    handleChange({
      target: {
        name: "descriptionOfSkillsSection",
        value: updatedSkills,
      },
    });
  };

  const renderSkillInputs = () => {
    const inputs = [];
    for (let i = 0; i < inputCount; i++) {
      inputs.push(
        <input
          className="inputSkills"
          placeholder="ej: Excelente comunicacion	"
          key={i}
          type="text"
          value={skills.skillsSection.descriptionOfSkillsSection[i] || ""}
          onChange={(e) => handleSkillChange(i, e.target.value)}
        />
      );
    }
    return inputs;
  };

  return (
    <div>
      <h3 className="title-section">
        <input
          className="inputTitle"
          placeholder="Habilidades o skills"
          type="text"
          name="titleOfSkillsSection"
          value={skills.skillsSection.titleOfSkillsSection}
          onChange={handleChange}
        />
      </h3>
      <div className="barra"></div>
      {/* <label>Titulo de la seccion Skills:</label>
      <input
        type="text"
        name="titleOfSkillsSection"
        value={skills.skillsSection.titleOfSkillsSection}
        onChange={handleChange}
        required
      /> */}
      <div className="skillContainer">
        <div className="skillInputSection">{renderSkillInputs()}</div>

        <div className="buttonsAdd">
          <button type="button" onClick={handleAddSkill}>
            Agregar habilidad
          </button>
          {inputCount > 1 && (
            <button type="button" onClick={handleDeleteSkill}>
              Eliminar Habilidad
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
