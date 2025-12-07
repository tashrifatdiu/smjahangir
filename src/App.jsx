import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import VisionPage from './pages/VisionPage';
import PioneersPage from './pages/PioneersPage';
import JournalPage from './pages/JournalPage';
import JournalDetailPage from './pages/JournalDetailPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import CreateJournal from './pages/CreateJournal';
import EditJournal from './pages/EditJournal';
import TeamPanel from './pages/TeamPanel';
import TeamMemberManagement from './pages/TeamMemberManagement';
import EventManagement from './pages/EventManagement';
import TaskManagement from './pages/TaskManagement';
import NoticeManagement from './pages/NoticeManagement';
import AttendanceManagement from './pages/AttendanceManagement';
import TeamMemberLogin from './pages/TeamMemberLogin';
import TeamMemberDashboard from './pages/TeamMemberDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/vision" element={<VisionPage />} />
              <Route path="/pioneers" element={<PioneersPage />} />
              <Route path="/team" element={<TeamPanel />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/journal/:id" element={<JournalDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/journal/create" element={
                <ProtectedRoute>
                  <CreateJournal />
                </ProtectedRoute>
              } />
              <Route path="/admin/journal/edit/:id" element={
                <ProtectedRoute>
                  <EditJournal />
                </ProtectedRoute>
              } />
              <Route path="/admin/team-members" element={
                <ProtectedRoute>
                  <TeamMemberManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/events" element={
                <ProtectedRoute>
                  <EventManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/tasks" element={
                <ProtectedRoute>
                  <TaskManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/notices" element={
                <ProtectedRoute>
                  <NoticeManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/attendance" element={
                <ProtectedRoute>
                  <AttendanceManagement />
                </ProtectedRoute>
              } />
              <Route path="/team/login" element={<TeamMemberLogin />} />
              <Route path="/team/dashboard" element={<TeamMemberDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
