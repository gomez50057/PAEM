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
    setMinuta(null);  // Reseteamos el archivo en el componente padre
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
              <p>{minuta.file.name}</p>
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
