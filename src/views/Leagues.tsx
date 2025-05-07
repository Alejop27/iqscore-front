import React from 'react';
import styled from 'styled-components';
import PageWithLayout from '../components/PageWithLayout';
import PartidosTop from '../components/common/Cards/TOPS/PartidosTop';
import AllLeague from '../components/common/All/AllLeagues';
import PartidosDelDia from '../components/common/PrincipalPage/GameDay';
import AD1 from '../components/common/Cards/ADS/Ad1';
import AD4 from '../components/common/Cards/ADS/Ad4';
import Ad3 from '../components/common/Cards/ADS/Ad3';

// Breakpoints for media queries
const breakpoints = {
  mobile: '768px', // Standard md: breakpoint in Tailwind, matching the navbar's responsiveness
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
  
  @media (max-width: ${breakpoints.mobile}) {
    display: none; /* Hide ads on mobile */
  }
`;

const TwoColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 42% 58%;
  width: 100%;
  gap: 2rem;
  margin: 30px 0;
  
  @media (max-width: ${breakpoints.mobile}) {
    display: none; /* Hide desktop layout on mobile */
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

// Mobile-specific container that only shows on smaller screens
const MobileContainer = styled.div`
  display: none;
  
  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px 0;
    width: 100%; /* Ensure full width on mobile */
  }
  
  /* Ensure children take full width */
  & > div {
    width: 100%;
  }
`;

const Leagues: React.FC = () => {
  return (
    <PageWithLayout>
      <Container>
        {/* This section only shows on mobile - leagues first, then games */}
        <MobileContainer>
          <div>
            <AD1 />
          </div>
          <div>
            <AllLeague />
          </div>
          <div>
            <PartidosDelDia />
          </div>
          <div>
            <Ad3 />
          </div>
        </MobileContainer>

        {/* The sections below will be hidden on mobile but visible on larger screens */}
        <FullWidthSection>
          <AD1 />
        </FullWidthSection>
        
        <TwoColumnContainer>
          <LeftColumn>
            <div>
              <AllLeague />
            </div>
            <div>
              <Ad3 />
            </div>
          </LeftColumn>
          
          <RightColumn>
            <div>
              <PartidosTop />
            </div>
            <div>
              <PartidosDelDia />
            </div>
          </RightColumn>
        </TwoColumnContainer>
        
        <FullWidthSection>
          <AD4 />
        </FullWidthSection>
      </Container>
    </PageWithLayout>
  );
};

export default Leagues;