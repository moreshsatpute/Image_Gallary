import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './ImageUploader.css';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { LuImagePlus } from 'react-icons/lu'



const ImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [zoomedImageIndex, setZoomedImageIndex] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const updatedSelectedImages = [...selectedImages];
    const updatedPreviewImages = [...previewImages];

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result;
        updatedSelectedImages.push(file);
        updatedPreviewImages.push(imageDataUrl);
        setSelectedImages(updatedSelectedImages);
        setPreviewImages(updatedPreviewImages);
      };

      reader.readAsDataURL(file);
    });
  }, [selectedImages, previewImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const openZoomedImage = (index) => {
    setZoomedImageIndex(index);
  };

  const closeZoomedImage = () => {
    setZoomedImageIndex(null);
  };

  const scrollLeft = () => {
    if (zoomedImageIndex > 0) {
      setZoomedImageIndex(zoomedImageIndex - 1);
    }
  };

  const scrollRight = () => {
    if (zoomedImageIndex < previewImages.length - 1) {
      setZoomedImageIndex(zoomedImageIndex + 1);
    }
  };

  return (
    <div className='imageUploaderContainer'>
      {selectedImages.length === 0 && (
        <div className='uploadOuter' {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>
              <LuImagePlus id='imageLogo'/>Browse or Drag & Drop Image Files Allowed formats * jpg, * jpeg, *png Max Image size 20 MB</p>
          )}
        </div>
      )}
      {selectedImages.length > 0 && (
        <div className='imageContainer'>
          {previewImages.map((image, index) => (
            <div key={index} className='imagePreview'>
              <img
                src={image}
                alt={`Uploaded ${index + 1}`}
                className='uploadedImage'
                onClick={() => openZoomedImage(index)}
              />
            </div>
          ))}
        </div>
      )}
      {zoomedImageIndex !== null && (
        <div className='zoomedImageContainer'>
          {zoomedImageIndex > 0 && (
            <div className='scrollArrow leftArrow' onClick={scrollLeft}>
              <span><MdArrowBackIosNew/></span>
            </div>
          )}
          <img
            src={previewImages[zoomedImageIndex]}
            alt='Zoomed'
            className='zoomedImage'
            onClick={closeZoomedImage}
          />
          {zoomedImageIndex < previewImages.length - 1 && (
            <div className='scrollArrow rightArrow' onClick={scrollRight}>
              <span><MdArrowForwardIos/></span>
            </div>
          )}
          <div className='queueImages'>
            {previewImages.map((image, index) => {
              if (index !== zoomedImageIndex && index > zoomedImageIndex && index < zoomedImageIndex + 5) {
                return (
                  <img
                    key={index}
                    src={image}
                    alt={`Uploaded ${index + 1}`}
                    className='queueImage'
                    onClick={() => openZoomedImage(index)}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
