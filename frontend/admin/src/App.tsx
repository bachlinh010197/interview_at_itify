import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

function AppLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const showSidebar = user && !isLoginPage;

  return (
    <>
      <Toaster position="top-right" />
      {showSidebar ? (
        <Layout>
          <Sidebar />
          <Main>
            <Routes>
              <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            </Routes>
          </Main>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
