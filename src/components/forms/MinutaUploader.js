import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const MinutaUploader = ({ onFilesChange }) => {
  const [file, setFile] = useState(null);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const newFile = acceptedFiles[0];
      setFile({
        file: newFile,
        preview: URL.createObjectURL(newFile),
      });
      onFilesChange(newFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFilesChange(null);
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      accept={{ 'application/pdf': ['.pdf'] }}  // Asegúrate de aceptar solo archivos PDF
      maxFiles={1}  // Solo permite cargar un archivo
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {file ? (
            <div className="file-preview">
              <p>{file.file.name}</p>
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
