export const HeroSection = ({ info, handleChange }) => {
  return (
    <>
      <h1>
        <div className="inputArea">
          <input
            className="inputNameComplete"
            placeholder=" Nombre completo"
            type="text"
            name="nameComplete"
            value={info.nameComplete}
            onChange={handleChange}
          />
        </div>
      </h1>
      <h2>
      <div>
          <input 
            className="inputRole"
            placeholder="Rol"
            type="text"
            name="role"
            value={info.role}
            onChange={handleChange}
          />
        </div>
      </h2>
      <div className="contact">
        <span >
          Email: <input className="inputEmail" type="email" name="email"placeholder="tu email" value={info.contactInfo.email} onChange={handleChange} />
        </span>
        <span>
          Teléfono: <input className="inputPhone" type="phone" name="phone"placeholder="tu teléfono" value={info.contactInfo.phone} onChange={handleChange} />
        </span>
        <span >
          Linkedin: <input className="inputLinkedin" type="text" name="linkedin"placeholder="tu linkedin" value={info.contactInfo.linkedin} onChange={handleChange} />
        </span>
      </div>
      <div className="barra"></div>

      {/* <label>Role:</label>
      <input
        type="text"
        name="role"
        value={info.role}
        onChange={handleChange}
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={info.contactInfo.email}
        onChange={handleChange}
      />

      <label>Phone:</label>
      <input
        type="text"
        name="phone"
        value={info.contactInfo.phone}
        onChange={handleChange}
      />

      <label>LinkedIn:</label>
      <input
        type="text"
        name="linkedin"
        value={info.contactInfo.linkedin}
        onChange={handleChange}
      /> */}
    </>
  );
};
