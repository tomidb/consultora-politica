import "./Sources.css";
import { servicios } from "../data.json";
import { SourceModal } from "./SourceModal";
import { MdPlayCircleFilled } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

export function Sources({ contentCategory }) {
  const [recurso, setRecurso] = useState(null);
  console.log(recurso);
  const initialDisplay = null;
  const [modalSource, setModalSource] = useState(initialDisplay);

  const handleModal = () => {
    setModalSource(initialDisplay);
  };

  const servicio = servicios.find(
    (servicio) => servicio.title === contentCategory
  );

  console.log(servicio.sources);
  return (
    <>
      {contentCategory !== "Estudios y encuestas"
        ? servicio.sources.map((source) => (
            <div key={crypto.randomUUID()} className="source-card">
              <div className="source-info">
                <p>{source.title}</p>
                <button
                  className="info-btn"
                  onClick={() => setModalSource(source)}
                >
                  <FaPlus className="info-btn-icon" />
                  Info
                </button>
              </div>
              <div className="vid-container">
                <video
                  src={`/media/${source.url}`}
                  alt={source.title}
                  className="source-vid"
                  muted
                ></video>
                <MdPlayCircleFilled
                  className="ver-video"
                  onClick={() => setRecurso(source)}
                />
              </div>
            </div>
          ))
        : null}

      <div
        className="popup-media"
        style={{ display: recurso ? "block" : "none" }}
      >
        <span onClick={() => setRecurso(null)}>&times;</span>
        {recurso ? (
          <video src={`/media/${recurso.url}`} muted autoPlay controls />
        ) : null}
      </div>

      {modalSource ? (
        <SourceModal
          title={modalSource.title}
          cliente={modalSource.cliente}
          tipo={modalSource.tipo}
          contexto={modalSource.contexto}
          medios={modalSource.medios}
          trabajo={modalSource.trabajo}
          detalle={modalSource.detalle}
          handleModal={handleModal}
        />
      ) : null}
    </>
  );
}
