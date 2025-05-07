import React from 'react';
import styled from 'styled-components';
import PageWithLayout from '../components/PageWithLayout';

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
  }
`;

const DesktopContainer = styled.div`
  display: block;

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;

  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 24px;
    padding: 20px;
  }
`;

const NotFound: React.FC = () => {
  return (
    <PageWithLayout>
      <Container>

        {/* Desktop Layout */}
        <DesktopContainer>
          <div className="w-full min-h-screen flex items-center justify-center font-nunito px-4">
            <div className="max-w-lg w-full text-center">
              <div className="mb-6">
                <div className="relative mx-auto w-40 h-40">
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                  <div className="absolute top-[15%] left-[15%] w-[70%] h-[70%] bg-white dark:bg-[#1B1D20] rounded-full flex items-center justify-center">
                    <span className="text-5xl font-bold text-[#354AED]">404</span>
                  </div>
                  <div className="absolute top-2 left-2 w-4 h-4 bg-black dark:bg-white rounded-full"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 bg-black dark:bg-white rounded-full"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 bg-black dark:bg-white rounded-full"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-black dark:bg-white rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-black dark:border-white rounded-full"></div>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-black dark:text-white mb-4">¡Fuera de juego!</h1>

              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Parece que el contenido que buscas ha salido del campo. <br />
                El árbitro ha mostrado tarjeta roja a esta página.
              </p>

              <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex items-center">
                  <div className="w-6 h-8 bg-yellow-400 mr-2"></div>
                  <span className="text-black dark:text-white">Advertencia</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-8 bg-red-600 mr-2"></div>
                  <span className="text-black dark:text-white">Página expulsada</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/"
                  className="bg-[#354AED] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-200 text-center"
                >
                  Volver al inicio
                </a>
              </div>

              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Tiempo añadido: Si crees que esto es un error, contacta con el equipo de soporte.
                </p>
              </div>
            </div>
          </div>
        </DesktopContainer>

        {/* Mobile Layout */}
        <MobileContainer>
          <div className="w-32 h-32 relative">
            <div className="absolute inset-0 bg-gray-300 dark:bg-gray-800 rounded-full"></div>
            <div className="absolute inset-[15%] bg-white dark:bg-[#1B1D20] rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-[#354AED]">404</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-black dark:text-white">¡Fuera de juego!</h1>

          <p className="text-gray-600 dark:text-gray-400">
            El contenido no se encuentra disponible.
          </p>

          <a
            href="/"
            className="bg-[#354AED] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-200 text-center"
          >
            Volver al inicio
          </a>
        </MobileContainer>

      </Container>
    </PageWithLayout>
  );
};

export default NotFound;
