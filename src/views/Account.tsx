import React from "react";
import styled from 'styled-components';
import PageWithLayout from "../components/PageWithLayout";
import AD1 from '../components/common/Cards/ADS/Ad1';
import ProfileCard from "../components/common/Usuario/ProfileCard";
import AccountData from "../components/common/Usuario/AccountData";
import PremiumPlanCard from "../components/common/Usuario/PremiumPlanCard";

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
  grid-template-columns: 40% 60%;
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

const Account: React.FC = () => {
    return (
        <PageWithLayout>
            <Container>
                {/* Mobile-first layout */}
                <MobileContainer>
                    <div>
                        <ProfileCard />
                    </div>
                    <div>
                        <AccountData />
                    </div>
                    <div>
                        <PremiumPlanCard />
                    </div>
                </MobileContainer>

                {/* Desktop layout */}
                <FullWidthSection>
                </FullWidthSection>

                <TwoColumnContainer>
                    <LeftColumn>
                        <div>
                            <ProfileCard />
                        </div>
                    </LeftColumn>

                    <RightColumn>
                        <div>
                            <AccountData />
                        </div>
                        <div>
                            <PremiumPlanCard />
                        </div>
                    </RightColumn>
                </TwoColumnContainer>

                <FullWidthSection>
                    <AD1 />
                </FullWidthSection>
            </Container>
        </PageWithLayout>
    )
}

export default Account;