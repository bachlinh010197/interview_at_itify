import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

/* ── Styled Components ── */

const Container = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Hero = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const HeroSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.25rem;
  font-size: 1.05rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const CardText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/* ── Component ── */

function DashboardPage() {
  const { user } = useAuth();

  return (
    <Container>
      <Hero>
        <HeroTitle>Admin Dashboard</HeroTitle>
        <HeroSubtitle>Welcome, {user?.email}</HeroSubtitle>
      </Hero>
      <Card>
        <CardTitle>System Overview</CardTitle>
        <CardText>Admin management features coming soon.</CardText>
      </Card>
    </Container>
  );
}

export default DashboardPage;
