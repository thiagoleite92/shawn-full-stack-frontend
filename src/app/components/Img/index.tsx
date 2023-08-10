import Image from 'next/image';
import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  customClass: string;
}

export default function Img({
  src,
  alt,
  width,
  height,
  customClass,
}: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={customClass}
    />
  );
}
