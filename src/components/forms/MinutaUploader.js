import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const MinutaUploader = ({ onFileChange }) => {
  const [file, setFile] = useState(null);

  const handleDrop = (acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile && newFile.type === 'application/pdf') {
      const fileWithPreview = {
        file: newFile,
        preview: URL.createObjectURL(newFile),
        progress: 0,
        completed: false
      };
      setFile(fileWithPreview);
      onFileChange(fileWithPreview);

      const interval = setInterval(() => {
        setFile((prevFile) => {
          if (!prevFile) return prevFile;

          const updatedFile = { ...prevFile };
          if (updatedFile.progress >= 100) {
            clearInterval(interval);
            updatedFile.completed = true;
          } else {
            updatedFile.progress += 10;
          }

          return updatedFile;
        });
      }, 100);
    } else {
      alert('Solo se permite cargar archivos PDF');
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFileChange(null);
  };

  return (
    <Dropzone onDrop={handleDrop} accept="application/pdf" multiple={false}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {!file && (
            <>
              <img src="/img/iconos/dropzone.png" alt="Icono de archivo PDF" />
              <div className="dropzone-txt">
                <p>Arrastra y suelta <span className="highlight">un archivo PDF</span></p>
                <p>o <span className="highlight">buscar un archivo</span> en su computadora</p>
              </div>
            </>
          )}
          {file && (
            <div className="file-preview">
              <div className="file-preview-item">
                <img src="/img/iconos/pdf-preview.png" alt="Vista previa de archivo PDF" />
                {file.completed ? (
                  <>
                    <div className="checkmark-circle">
                      <svg viewBox="0 0 52 52" className="checkmark">
                        <circle cx="26" cy="26" r="25" fill="none" />
                        <path d="M14 27l8 8 16-16" fill="none" />
                      </svg>
                    </div>
                    <div className="file-details">
                      <p>{file.file.name}</p>
                      <button type="button" onClick={handleRemoveFile}>
                        Eliminar
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${file.progress}%` }}></div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );
};

export default MinutaUploader;
