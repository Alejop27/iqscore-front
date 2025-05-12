import React from "react";
import styled from "styled-components";

const AdContainer = styled.div`
  width: 150px;
  background-color: #1B1D20;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #2a2d30;
`;

const AdLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
`;

const AdImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const Ad3: React.FC = () => {
  return (
    <AdContainer>

      <AdLink 
        href="https://online.wplay.co/page?member=livesportcors&campaign=DEFAULT&channel=FS.co_Banner_TOP_ExtraAFFI&zone=66253678&lp=0" 
        target="_blank"
        rel="noopener noreferrer"
      >
        <AdImage 
          src="https://content.livesportmedia.eu/media?name=120x240.jpg%20(654)&type=jpeg&s=1746613231" 
          alt="Anuncio"
        />
      </AdLink>
    </AdContainer>
  );
};

export default Ad3;