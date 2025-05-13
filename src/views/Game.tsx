import React from 'react';
import styled from 'styled-components';
import PageWithLayout from '../components/PageWithLayout';
import AD1 from '../components/common/Cards/ADS/Ad1';
import MatchInfo from '../components/common/Game/InfoGame';
import MatchEvents from '../components/common/Game/Odds';
import StartingLineup from '../components/common/Game/Headlines';
import Ad3 from '../components/common/Cards/ADS/Ad3';

const breakpoints = {
  mobile: '1000px',
};

const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 16px;
  margin-top: 100px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 80px;
  }
`;

const FullWidthSection = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const TwoColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 60% 38%;
  width: 100%;
  gap: 1rem;
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

// Mobile-specific layout
const MobileContainer = styled.div`
  display: none;

  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px 0;
    width: 100%;

    & > div {
      width: 100%;
    }
  }
`;

const Game: React.FC = () => {
  return (
    <PageWithLayout>
      <Container>
        {/* Mobile-first layout */}
        <MobileContainer>
            <div>
                <AD1 />
            </div>
          <div>
            <MatchInfo />
          </div>
          <div>
            <MatchEvents />
          </div>
          <div>
            <StartingLineup />
          </div>
        </MobileContainer>

        {/* Desktop layout */}
        <FullWidthSection>
          <AD1 />
        </FullWidthSection>

        <TwoColumnContainer>
          <LeftColumn>
            <div>
              <MatchInfo />
            </div>
            <div>
              <StartingLineup />
            </div>
          </LeftColumn>

          <RightColumn>
            <div>
              <MatchEvents />
            </div>
            <div>
              <Ad3 />
            </div>
          </RightColumn>
        </TwoColumnContainer>

        <FullWidthSection>
          <AD1 />
        </FullWidthSection>
      </Container>
    </PageWithLayout>
  );
};

export default Game;
