import React from 'react';
import styled from 'styled-components';

const AdContainer = styled.a`
  display: block;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
`;

const AdImage = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;

const AD1: React.FC = () => {
  return (
    <AdContainer 
      href="https://online.wplay.co/page?member=livesportcors&campaign=DEFAULT&channel=FS.co_Banner_TOP_ExtraAFFI&zone=66253678&lp=0" 
      target="_blank"
      rel="noopener noreferrer"
    >
      <AdImage 
        src="https://content.livesportmedia.eu/media?name=970x90.jpg%20(666)&type=jpeg&s=1746613341" 
        alt="Anuncio"
      />
    </AdContainer>
  );
};

export default AD1;