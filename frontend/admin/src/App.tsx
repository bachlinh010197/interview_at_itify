import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import VehicleListPage from './pages/vehicle/VehicleListPage';
import VehicleCreatePage from './pages/vehicle/VehicleCreatePage';
import VehicleEditPage from './pages/vehicle/VehicleEditPage';
import DriverListPage from './pages/driver/DriverListPage';
import DriverCreatePage from './pages/driver/DriverCreatePage';
import DriverEditPage from './pages/driver/DriverEditPage';

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
              <Route path="/vehicle" element={<ProtectedRoute><VehicleListPage /></ProtectedRoute>} />
              <Route path="/vehicle/create" element={<ProtectedRoute><VehicleCreatePage /></ProtectedRoute>} />
              <Route path="/vehicle/:id" element={<ProtectedRoute><VehicleEditPage /></ProtectedRoute>} />
              <Route path="/driver" element={<ProtectedRoute><DriverListPage /></ProtectedRoute>} />
              <Route path="/driver/create" element={<ProtectedRoute><DriverCreatePage /></ProtectedRoute>} />
              <Route path="/driver/:id" element={<ProtectedRoute><DriverEditPage /></ProtectedRoute>} />
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
      <GlobalStyles/>
      <BrowserRouter>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
