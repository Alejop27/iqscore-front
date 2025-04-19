import PageWithLayout from '../components/PageWithLayout';
import styled from 'styled-components';
import React from 'react';
import AD1 from '../components/common/Cards/ADS/Ad1';
import InfoTeam from '../components/common/Team/InfoTeam';
import PlayerTeam from '../components/common/Team/PlayersTeam';
import TablePositions from '../components/common/Team/TablePositionsTeam';
import TeamGames from '../components/common/Team/TeamGames';

const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0;
  margin-top: 100px; /* Esto da espacio para el navbar fijo */
`;

const FullWidthSection = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
`;

const TwoColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  width: 100%;
  gap: 2rem;
  margin: 30px 0;
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

const Team: React.FC = () => {
    return (
        <PageWithLayout>
            <Container>
                <FullWidthSection>
                    <AD1 />
                </FullWidthSection>

                <TwoColumnContainer>
                    <LeftColumn>
                        <div>
                            <InfoTeam />
                        </div>

                        <div>
                            <TeamGames />
                        </div>  

                        <div>
                            <PlayerTeam />
                        </div>

                    </LeftColumn>

                    <RightColumn>
                        <div>
                            <TablePositions />
                        </div>
                    </RightColumn>
                </TwoColumnContainer>
            </Container>
        </PageWithLayout>
    )
}

export default Team;