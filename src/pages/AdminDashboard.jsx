import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchClient from '../utils/fetchClient';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [journals, setJournals] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    totalTasks: 0,
    pendingTasks: 0,
    totalNotices: 0,
    publishedNotices: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [journalsData, messagesData, members, events, tasks, notices] = await Promise.all([
        fetchClient('/journal/all?limit=100'),
        fetchClient('/contact/all'),
        fetchClient('/team-member').catch(() => []),
        fetchClient('/event').catch(() => []),
        fetchClient('/task').catch(() => []),
        fetchClient('/notice').catch(() => [])
      ]);
      
      setJournals(journalsData.journals);
      setMessages(messagesData);
      
      setStats({
        totalMembers: members.length,
        activeMembers: members.filter(m => m.status === 'active').length,
        totalEvents: events.length,
        upcomingEvents: events.filter(e => e.status === 'scheduled').length,
        totalTasks: tasks.length,
        pendingTasks: tasks.filter(t => t.status === 'pending').length,
        totalNotices: notices.length,
        publishedNotices: notices.filter(n => n.status === 'published').length
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this journal?')) return;

    try {
      await fetchClient(`/journal/${id}`, { method: 'DELETE' });
      setJournals(journals.filter(j => j._id !== id));
    } catch (error) {
      alert('Error deleting journal: ' + error.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header-section">
          <h1>ক্যাম্পেইন ম্যানেজমেন্ট সিস্টেম</h1>
          <p className="dashboard-subtitle">সম্পূর্ণ দল পরিচালনা ও সংগঠন ব্যবস্থাপনা</p>
        </div>

        {/* ERP Stats Grid */}
        <div className="erp-stats-grid">
          <div className="stat-card members">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{stats.totalMembers}</h3>
              <p>মোট সদস্য</p>
              <span className="stat-detail">{stats.activeMembers} সক্রিয়</span>
            </div>
          </div>

          <div className="stat-card events">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3>{stats.totalEvents}</h3>
              <p>মোট ইভেন্ট</p>
              <span className="stat-detail">{stats.upcomingEvents} আসন্ন</span>
            </div>
          </div>

          <div className="stat-card tasks">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <h3>{stats.totalTasks}</h3>
              <p>মোট কাজ</p>
              <span className="stat-detail">{stats.pendingTasks} অপেক্ষমাণ</span>
            </div>
          </div>

          <div className="stat-card notices">
            <div className="stat-icon">📢</div>
            <div className="stat-content">
              <h3>{stats.totalNotices}</h3>
              <p>মোট নোটিশ</p>
              <span className="stat-detail">{stats.publishedNotices} প্রকাশিত</span>
            </div>
          </div>

          <div className="stat-card journals">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <h3>{journals.length}</h3>
              <p>মোট জার্নাল</p>
              <span className="stat-detail">সংবাদ ও আপডেট</span>
            </div>
          </div>

          <div className="stat-card messages">
            <div className="stat-icon">✉️</div>
            <div className="stat-content">
              <h3>{messages.length}</h3>
              <p>যোগাযোগ বার্তা</p>
              <span className="stat-detail">জনগণের বার্তা</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <h2>দ্রুত কার্যক্রম</h2>
          <div className="actions-grid">
            <Link to="/admin/team-members" className="action-card">
              <span className="action-icon">👥</span>
              <h3>টিম ম্যানেজমেন্ট</h3>
              <p>সদস্য যোগ, সম্পাদনা ও পরিচালনা</p>
            </Link>

            <Link to="/admin/events" className="action-card">
              <span className="action-icon">📅</span>
              <h3>ইভেন্ট ম্যানেজমেন্ট</h3>
              <p>সভা, সমাবেশ ও কর্মসূচি পরিকল্পনা</p>
            </Link>

            <Link to="/admin/tasks" className="action-card">
              <span className="action-icon">✓</span>
              <h3>টাস্ক ম্যানেজমেন্ট</h3>
              <p>কাজ বরাদ্দ ও অগ্রগতি ট্র্যাকিং</p>
            </Link>

            <Link to="/admin/notices" className="action-card">
              <span className="action-icon">📢</span>
              <h3>নোটিশ ম্যানেজমেন্ট</h3>
              <p>ঘোষণা ও বিজ্ঞপ্তি প্রকাশ</p>
            </Link>

            <Link to="/admin/attendance" className="action-card">
              <span className="action-icon">📋</span>
              <h3>উপস্থিতি ব্যবস্থাপনা</h3>
              <p>দৈনিক উপস্থিতি রেকর্ড</p>
            </Link>

            <Link to="/admin/journal/create" className="action-card">
              <span className="action-icon">📝</span>
              <h3>জার্নাল তৈরি</h3>
              <p>নতুন সংবাদ ও আপডেট</p>
            </Link>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Journals</h2>
            <Link to="/admin/journal/create" className="btn btn-primary">
              Create New Journal
            </Link>
          </div>

          <div className="journals-table">
            {journals.length === 0 ? (
              <p>No journals yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {journals.map(journal => (
                    <tr key={journal._id}>
                      <td>{journal.title}</td>
                      <td>{new Date(journal.createdAt).toLocaleDateString()}</td>
                      <td className="actions">
                        <Link to={`/admin/journal/edit/${journal._id}`} className="btn btn-secondary">
                          Edit
                        </Link>
                        <button onClick={() => handleDelete(journal._id)} className="btn btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Recent Contact Messages</h2>
          <div className="messages-list">
            {messages.length === 0 ? (
              <p>No messages yet.</p>
            ) : (
              messages.slice(0, 5).map(msg => (
                <div key={msg._id} className="message-card">
                  <h3>{msg.name} - {msg.email}</h3>
                  <p><strong>Subject:</strong> {msg.subject || 'No subject'}</p>
                  <p>{msg.message}</p>
                  <small>{new Date(msg.createdAt).toLocaleString()}</small>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
