import React from 'react';
import cryzarLogo from './assets/B1.png';

function CryzarLogo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt="Cryzar Logo" src={cryzarLogo.src} {...props} />;
}

export default CryzarLogo;