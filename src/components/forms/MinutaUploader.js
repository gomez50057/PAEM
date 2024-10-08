import React from 'react';
import Dropzone from 'react-dropzone';

const MinutaUploader = ({ minuta, setMinuta }) => {
  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const newFile = acceptedFiles[0];
      setMinuta({
        file: newFile,
        preview: URL.createObjectURL(newFile),
      });
    }
  };

  const handleRemoveFile = () => {
    setMinuta(null);
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      accept={{ 'application/pdf': ['.pdf'] }}  // Solo aceptar archivos PDF
      maxFiles={1}  // Solo un archivo permitido
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {minuta ? (
            <div className="file-preview">
              {/* Mostrar el nombre del archivo si es un nuevo archivo subido, o la URL si es una minuta ya existente */}
              <p>{minuta.file ? minuta.file.name : "Minuta existente"}</p>
              <button type="button" onClick={handleRemoveFile}>
                Eliminar
              </button>
            </div>
          ) : (
            <div className="dropzone-txt">
              <img src="/img/iconos/dropzone.png" alt="Subir archivo PDF" className="upload-icon" />
              <p>Arrastra y suelta el <span className="highlight">archivo PDF</span> de la minuta</p>
              <p>o <span className="highlight">busca un archivo</span> en tu computadora</p>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );
};

export default MinutaUploader;
