import PageWithLayout from '../components/PageWithLayout';
import styled from 'styled-components';
import React from 'react';
import AD1 from '../components/common/Cards/ADS/Ad1';
import TablePositionsLeague from '../components/common/Cards/League/TablaPositionsLeague';
import LeagueInfo from '../components/common/Cards/League/LeagueInfo';
import GamesLeague from '../components/common/Cards/League/GamesLeague';
import TopScorers from '../components/common/Cards/League/TopScorer';
import TopAssistant from '../components/common/Cards/League/TopAssistant';
import TopCards from '../components/common/Cards/League/TopCard';

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

const ThreeColumnContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 1.5rem;
`;

const League: React.FC = () => {
    return (
        <PageWithLayout>
            <Container>
                <FullWidthSection>
                    <AD1 />
                </FullWidthSection>

                <TwoColumnContainer>
                    <LeftColumn>
                      <div>
                        <LeagueInfo />
                      </div>
                      <div>
                        <GamesLeague />
                      </div>
                    </LeftColumn>

                    <RightColumn>
                    <div>
                        <TablePositionsLeague />
                    </div>

                    <ThreeColumnContainer>
                          <TopScorers />
                          <TopAssistant />
                          <TopCards />
                      </ThreeColumnContainer>
                    </RightColumn>

                </TwoColumnContainer>

                <FullWidthSection>
                    <AD1 />
                </FullWidthSection>
            </Container>
        </PageWithLayout>
    )
}

export default League;