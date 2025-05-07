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
  margin-top: 100px;

  @media (max-width: 768px) {
    padding: 0 1rem; /* 16px a los lados en móviles */
  }
`;


const FullWidthSection = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-areas:
    "info    table"
    "games   table"
    "ads     table"
    "scorers scorers";
  grid-template-columns: 40% 60%;
  gap: 2rem;
  margin: 30px 0;

  @media (max-width: 768px) {
    grid-template-areas:
      "info"
      "table"
      "scorers"
      "games";
    grid-template-columns: 1fr;
  }
`;

const LeagueInfoWrapper = styled.div`
  grid-area: info;
`;

const TablePositionsWrapper = styled.div`
  grid-area: table;
`;

const GamesLeagueWrapper = styled.div`
  grid-area: games;
`;

const ThreeColumnWrapper = styled.div`
  grid-area: scorers;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const League: React.FC = () => {
  return (
    <PageWithLayout>
      <Container>
        <FullWidthSection>
          <AD1 />
        </FullWidthSection>

        <GridLayout>
          <LeagueInfoWrapper>
            <LeagueInfo />
          </LeagueInfoWrapper>

          <TablePositionsWrapper>
            <TablePositionsLeague />
          </TablePositionsWrapper>

          <ThreeColumnWrapper>
            <TopScorers />
            <TopAssistant />
            <TopCards />
          </ThreeColumnWrapper>

          <GamesLeagueWrapper>
            <GamesLeague />
          </GamesLeagueWrapper>
        </GridLayout>

        <FullWidthSection>
          <AD1 />
        </FullWidthSection>
      </Container>
    </PageWithLayout>
  );
};

export default League;
