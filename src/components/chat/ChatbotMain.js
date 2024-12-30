import React, { useState } from "react";
// import "./Chatbot.module.css";

const ChatbotMain = () => {
  const [currentStep, setCurrentStep] = useState("menu");
  const [formData, setFormData] = useState({ name: "", description: "", municipalities: "" });
  const [selectedZone, setSelectedZone] = useState("");

  const handleMenuClick = (step) => setCurrentStep(step);
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetToMainMenu = () => {
    setCurrentStep("menu");
    setFormData({ name: "", description: "", municipalities: "" });
    setSelectedZone("");
  };

  const renderMenu = () => (
    <div className="chatbot-menu">
      <p>Selecciona alguna de las siguientes opciones del menú:</p>
      <ul>
        <li onClick={() => handleMenuClick("proposal")}>Quiero hacer una propuesta metropolitana</li>
        <li onClick={() => handleMenuClick("zoneInfo")}>Quiero información acerca de alguna de las zonas metropolitanas</li>
        <li onClick={() => handleMenuClick("authorities")}>Quiero conocer el trabajo de las autoridades materia metropolitana</li>
        <li onClick={() => handleMenuClick("projects")}>Quiero conocer los proyectos metropolitanos</li>
        <li onClick={() => handleMenuClick("planning")}>Quiero conocer los instrumentos de planeación</li>
        <li onClick={() => handleMenuClick("cartography")}>Quiero consultar la cartografía de alguna de las Zonas Metropolitanas</li>
      </ul>
    </div>
  );

  const renderProposalForm = () => (
    <div className="chatbot-step">
      <p>¡Perfecto! Por favor responde las siguientes preguntas:</p>
      <form>
        <label>
          ¿Cómo se llama tu proyecto?
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          ¿En qué consiste? (Máximo 500 caracteres)
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength="500"
          />
        </label>
        <label>
          ¿Cuáles municipios comprende?
          <input
            type="text"
            name="municipalities"
            value={formData.municipalities}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={() => handleMenuClick("proposalThanks")}>
          Enviar
        </button>
      </form>
    </div>
  );

  const renderZoneInfo = () => (
    <div className="chatbot-step">
      <p>Claro que sí, ¿Qué Zona Metropolitana te interesa conocer?</p>
      <ul>
        <li onClick={() => handleMenuClick("zoneDetails", setSelectedZone("ZMVM"))}>
          Zona Metropolitana del Valle de México
        </li>
        <li onClick={() => handleMenuClick("zoneDetails", setSelectedZone("ZMPachuca"))}>
          Zona Metropolitana de Pachuca
        </li>
        <li onClick={() => handleMenuClick("zoneDetails", setSelectedZone("ZMTulancingo"))}>
          Zona Metropolitana de Tulancingo
        </li>
        <li onClick={() => handleMenuClick("zoneDetails", setSelectedZone("ZMTula"))}>
          Zona Metropolitana de Tula
        </li>
      </ul>
    </div>
  );

  const renderZoneDetails = () => (
    <div className="chatbot-step">
      <p>¡Claro! Te comparto la ficha de la zona {selectedZone}:</p>
      <a
        href={`/${selectedZone.toLowerCase()}-ficha.pdf`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver Ficha
      </a>
      <button onClick={resetToMainMenu}>Regresar al menú principal</button>
    </div>
  );

  const renderResponseWithLink = (message, link) => (
    <div className="chatbot-step">
      <p>{message}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        Ver más
      </a>
      <button onClick={resetToMainMenu}>Regresar al menú principal</button>
    </div>
  );

  const renderCartography = () => (
    <div className="chatbot-step">
      <p>Escoge una de las Zonas Metropolitanas para visualizar la cartografía:</p>
      <ul>
        <li onClick={() => handleMenuClick("cartographyDetails", setSelectedZone("ZMVM"))}>
          Zona Metropolitana del Valle de México
        </li>
        <li onClick={() => handleMenuClick("cartographyDetails", setSelectedZone("ZMPachuca"))}>
          Zona Metropolitana de Pachuca
        </li>
        <li onClick={() => handleMenuClick("cartographyDetails", setSelectedZone("ZMTulancingo"))}>
          Zona Metropolitana de Tulancingo
        </li>
        <li onClick={() => handleMenuClick("cartographyDetails", setSelectedZone("ZMTula"))}>
          Zona Metropolitana de Tula
        </li>
      </ul>
    </div>
  );

  const renderCartographyDetails = () => (
    <div className="chatbot-step">
      <p>
        Con gusto, te comparto el siguiente documento donde podrás visualizar toda la cartografía
        de la zona {selectedZone}:
      </p>
      <a
        href={`/${selectedZone.toLowerCase()}-cartografia.pdf`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver Cartografía
      </a>
      <button onClick={resetToMainMenu}>Regresar al menú principal</button>
    </div>
  );

  const renderContent = () => {
    switch (currentStep) {
      case "menu":
        return renderMenu();
      case "proposal":
        return renderProposalForm();
      case "proposalThanks":
        return (
          <div className="chatbot-step">
            <p>Gracias, tu propuesta será registrada!</p>
            <button onClick={resetToMainMenu}>Regresar al menú principal</button>
          </div>
        );
      case "zoneInfo":
        return renderZoneInfo();
      case "zoneDetails":
        return renderZoneDetails();
      case "authorities":
        return renderResponseWithLink(
          "Claro que sí, te comparto el siguiente link donde encontrarás la información de las Comisiones Metropolitanas:",
          "/comisiones"
        );
      case "projects":
        return renderResponseWithLink(
          "Con gusto, te comparto el siguiente link para visualizar nuestro mapa interactivo:",
          "/mapa"
        );
      case "planning":
        return renderResponseWithLink(
          "Con gusto, te comparto el siguiente link de nuestra Biblioteca Digital:",
          "/biblioteca"
        );
      case "cartography":
        return renderCartography();
      case "cartographyDetails":
        return renderCartographyDetails();
      default:
        return renderMenu();
    }
  };

  return (
    <div className="chatbot-container">
      <h1>Chatbot: Metrópoli Hidalgo</h1>
      {renderContent()}
    </div>
  );
};

export default ChatbotMain;
