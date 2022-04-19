import React from 'react';

const Picture = (props) => (
  <picture>
    <source srcSet={`${props.baseUrl}${props.imgwebp}`} type="image/webp" />
    <source srcSet={`${props.baseUrl}${props.imgjpg}`} type="image/jpeg" />
    <img
      style={props.style}
      onLoad={props.onLoad}
      className={props.className}
      src={`${props.baseUrl}${props.imgwebp}`}
      alt={props.alt}
    />
  </picture>
);

export default Picture;
