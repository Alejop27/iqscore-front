import React, { useState } from 'react';
import styled from 'styled-components';
import PageWithLayout from '../components/PageWithLayout';
import AD1 from '../components/common/Cards/ADS/Ad1';
import PlayerTeam from '../components/common/Team/PlayersTeam';
import TablePositions from '../components/common/Team/TablePositionsTeam';
import TeamGames from '../components/common/Team/TeamGames';
import TeamContainer from '../components/common/Team/TeamContainer';
import { useParams } from 'react-router-dom';

const breakpoints = {
  mobile: '768px',
};

const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 16px;
  margin-top: 100px; /* Esto da espacio para el navbar fijo */

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 80px; /* Slightly less top margin on mobile */
  }
`;

const FullWidthSection = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
`;

const TwoColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 35% 63%;
  width: 100%;
  gap: 2rem;
  margin: 30px 0;

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const MobileContainer = styled.div`
  display: none;

  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px 0;
    width: 100%;
  }

  & > div {
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  background-color: ${({ active }) => (active ? '#8400FF' : '#1B1D20')};
  color: ${({ active }) => (active ? '#fff' : '#fff')};
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? '#8400FF' : 'gray')};
  }
`;

const Team: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [showTable, setShowTable] = useState(true);

  return (
    <PageWithLayout>
      <Container>
        <FullWidthSection>
          <AD1 />
        </FullWidthSection>

        {/* Desktop layout */}
        <TwoColumnContainer>
          <LeftColumn>
            <div>
              <TeamContainer />
            </div>

            <div>
              <PlayerTeam idEquipo={Number(teamId)} />
            </div>
          </LeftColumn>

          <RightColumn>
            <div>
              <TablePositions />
            </div>

            <div>
              <TeamGames />
            </div>
          </RightColumn>
        </TwoColumnContainer>

        {/* Mobile layout */}
        <MobileContainer>
          <div>
            <TeamContainer />
          </div>

          <ButtonGroup>
            <ToggleButton active={!showTable} onClick={() => setShowTable(false)}>
              Jugadores
            </ToggleButton>
            <ToggleButton active={showTable} onClick={() => setShowTable(true)}>
              Tabla
            </ToggleButton>
          </ButtonGroup>

          <div>
            {showTable ? (
              <TablePositions />
            ) : (
              <PlayerTeam idEquipo={Number(teamId)} />
            )}
          </div>

          <div>
            <TeamGames />
          </div>
        </MobileContainer>
      </Container>
    </PageWithLayout>
  );
};

export default Team;
