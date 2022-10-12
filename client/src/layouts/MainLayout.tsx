import React from 'react';
import { Header } from 'components';
import { Container } from './style';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};
