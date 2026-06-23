import React from 'react';
import noImage from '../assets/images/no_image.png';

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        // Prevent infinite loop by checking if we're already showing the fallback
        if (e.target.src !== noImage) {
          e.target.src = noImage;
        }
      }}
      {...props}
    />
  );
}

export default Image;