import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const LoadingContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const LoadingText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 2rem 0;
`;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
