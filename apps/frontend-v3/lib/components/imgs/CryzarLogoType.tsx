import React from 'react';
import cryzarLogo from './assets/T1.png';

const CryzarLogoType: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return <img alt="Cryzar Logo" src={cryzarLogo.src} {...props} />;
};

export default CryzarLogoType;