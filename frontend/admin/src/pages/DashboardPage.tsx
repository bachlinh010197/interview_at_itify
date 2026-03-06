import { useAuth } from '../context/AuthContext';

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container">
      <header className="hero">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user?.email}</p>
      </header>
      <div className="card">
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>System Overview</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Admin management features coming soon.
        </p>
      </div>
    </div>
  );
}

export default DashboardPage;
