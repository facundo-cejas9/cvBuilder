import React, { useEffect, useRef } from "react";

export const ProfileSection = ({ handleChange, profileInfo }) => {
  const textAreaRef = useRef(null);

  const autoResizeTextarea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [profileInfo.profileSection.descriptionOfProfileSection]);

  return (
    <>
      <h3 className="title-section">
        <input
          className="inputTitle"
          placeholder="PERFIL O SOBRE MI"
          type="text"
          name="titleOfProfileSection"
          value={profileInfo.profileSection.titleOfProfileSection}
          onChange={handleChange}
        />
      </h3>
      <div className="barra"></div>
      <div>
        <p className="description-section">
          <textarea
            ref={textAreaRef}
            className="textAreaDescriptionProfile"
            placeholder="Descripción sobre tu perfil, o información destacada sobre vos..."
            type="text"
            name="descriptionOfProfileSection"
            value={profileInfo.profileSection.descriptionOfProfileSection}
            onChange={(e) => {
              handleChange(e);
              autoResizeTextarea();
            }}
          />
        </p>
      </div>

      <div className="barra"></div>

      {/* <label>Titulo de la sección:</label>
      <input
        type="text"
        name="titleOfProfileSection"
        value={profileInfo.profileSection.titleOfProfileSection}
        onChange={handleChange}
      />
      <label>{ `Descripción de la sección` }:</label>
      <input
        type="text"
        name="descriptionOfProfileSection"
        value={profileInfo.profileSection.descriptionOfProfileSection}
        onChange={handleChange}
      /> */}
    </>
  );
};
