import React from 'react';
import PageWithLayout from '../components/PageWithLayout';
import styled from 'styled-components';
import AD1 from '../components/common/Cards/ADS/Ad1';
import PlayerProfile from '../components/common/Player/ProfilePlayer';
import PlayerTrajectory from '../components/common/Player/TeamsPlayer';
import Statistics from '../components/common/Player/statistics';

const breakpoints = {
  mobile: '768px',
};

const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0;
  margin-top: 100px;
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
  grid-template-columns: 50% 50%;
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

    & > div {
      width: 100%;
    }
  }
`;

const Player: React.FC = () => {
  return (
    <PageWithLayout>
      <Container>
        <FullWidthSection>
          <AD1 />
        </FullWidthSection>

        {/* Desktop Layout */}
        <TwoColumnContainer>
          <LeftColumn>
            <div>
              <PlayerProfile />
            </div>
          </LeftColumn>

          <RightColumn>
            <div>
              <PlayerTrajectory />
            </div>
          </RightColumn>
        </TwoColumnContainer>

        <FullWidthSection>
          <Statistics />
        </FullWidthSection>

        <FullWidthSection>
          <AD1 />
        </FullWidthSection>

        {/* Mobile Layout */}
        <MobileContainer>
          <div>
            <PlayerProfile />
          </div>
          <div>
            <PlayerTrajectory />
          </div>
          <div>
            <Statistics />
          </div>
        </MobileContainer>
      </Container>
    </PageWithLayout>
  );
};

export default Player;
