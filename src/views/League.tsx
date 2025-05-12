import PageWithLayout from '../components/PageWithLayout';
import styled from 'styled-components';
import React from 'react';
import AD1 from '../components/common/Cards/ADS/Ad1';
import TablePositionsLeague from '../components/common/Cards/League/TablaPositionsLeague';
import LeagueInfo from '../components/common/Cards/League/LeagueInfo';
import TopScorers from '../components/common/Cards/League/TopScorer';
import TopAssistant from '../components/common/Cards/League/TopAssistant';
import TopCards from '../components/common/Cards/League/TopCard';
import NoticiasRelevo from '../components/common/Cards/TOPS/Noticias';

// Breakpoints for media queries
const breakpoints = {
  mobile: '768px',
};

const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 16px;
  margin-top: 100px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 80px;
    padding: 0 1rem;
  }
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
  
  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
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

const ThreeColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
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

const League: React.FC = () => {
  return (
    <PageWithLayout>
      <Container>
        {/* Mobile view */}
        <MobileContainer>
          <AD1 />
          <LeagueInfo />
          <TablePositionsLeague />
          <ThreeColumnWrapper>
            <TopScorers />
            <TopAssistant />
            <TopCards />
          </ThreeColumnWrapper>
          <NoticiasRelevo />
          <AD1 />
        </MobileContainer>

        {/* Desktop view */}
        <FullWidthSection>
          <AD1 />
        </FullWidthSection>
        
        <TwoColumnContainer>
          <LeftColumn>
            <LeagueInfo />
            <NoticiasRelevo />
          </LeftColumn>
          
          <RightColumn>
            <TablePositionsLeague />
            <ThreeColumnWrapper>
              <TopScorers />
              <TopAssistant />
              <TopCards />
            </ThreeColumnWrapper>
          </RightColumn>
        </TwoColumnContainer>
        
        <FullWidthSection>
          <AD1 />
        </FullWidthSection>
      </Container>
    </PageWithLayout>
  );
};

export default League;