import { Image } from 'antd';
import React from 'react';

const Picture = (props: {
  baseUrl?: any;
  imgwebp?: any;
  imgjpg?: any;
  style?: React.CSSProperties | undefined;
  onLoad?: React.ReactEventHandler<HTMLImageElement> | undefined;
  className?: string | undefined;
  alt?: string | undefined;
}) => (
  <Image.PreviewGroup>
    <Image srcSet={`${props.baseUrl}${props.imgwebp}`} />
    <Image srcSet={`${props.baseUrl}${props.imgjpg}`} />
    <Image
      style={props.style}
      onLoad={props.onLoad}
      className={props.className}
      src={`${props.baseUrl}${props.imgwebp}`}
      alt={props.alt}
    />
  </Image.PreviewGroup>
);

export default Picture;
