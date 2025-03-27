import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  background-color: #181818;
  color: #fff;
  padding: 20px;
  width: 230px;
  margin-top: 20px;
  border-radius: 8px;
`;

const SectionTitle = styled.h3`
  border-bottom: 2px solid #ffcc00;
  padding-bottom: 10px;
  margin: 0;
`;

const PlayerOfTheWeek: React.FC = () => {
  return (
    <SidebarContainer>
      <SectionTitle>ANUNCIO 1</SectionTitle>
    </SidebarContainer>
  );
};

export default PlayerOfTheWeek;