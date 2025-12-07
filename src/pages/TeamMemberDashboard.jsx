import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchClient from '../utils/fetchClient';
import './TeamMemberDashboard.css';

const TeamMemberDashboard = () => {
  const [member, setMember] = useState(null);
  const [myTasks, setMyTasks] = useState([]);
  const [notices, setNotices] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    
    if (!token || userType !== 'team_member') {
      navigate('/team/login');
      return;
    }

    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      const memberInfo = JSON.parse(localStorage.getItem('memberInfo'));
      setMember(memberInfo);

      const [tasksData, noticesData, attendanceData] = await Promise.all([
        fetchClient('/task/me').catch(() => []),
        fetchClient('/notice/published').catch(() => []),
        fetchClient('/attendance/me').catch(() => [])
      ]);

      setMyTasks(tasksData);
      setNotices(noticesData.slice(0, 5));
      
      // Get today's attendance
      const today = new Date().toISOString().slice(0, 10);
      const todayAtt = attendanceData.find(a => 
        new Date(a.date).toISOString().slice(0, 10) === today
      );
      setTodayAttendance(todayAtt);
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      await fetchClient('/attendance/checkin', { method: 'POST' });
      loadDashboardData();
      alert('চেক-ইন সফল হয়েছে!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      await fetchClient('/attendance/checkout', { method: 'POST' });
      loadDashboardData();
      alert('চেক-আউট সফল হয়েছে!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await fetchClient(`/task/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      loadDashboardData();
      alert('টাস্ক আপডেট হয়েছে!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('memberInfo');
    navigate('/team/login');
  };

  if (loading) return <div className="loading">লোড হচ্ছে...</div>;

  return (
    <div className="team-dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="welcome-section">
              <h1>স্বাগতম, {member?.name}!</h1>
              <p className="member-role">{member?.position}</p>
              <span className={`status-badge ${member?.status}`}>
                {member?.status === 'active' ? '✓ সক্রিয়' : member?.status}
              </span>
            </div>
            <button onClick={handleLogout} className="btn-logout">
              লগআউট
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <h3>{myTasks.length}</h3>
              <p>মোট টাস্ক</p>
              <span className="stat-detail">
                {myTasks.filter(t => t.status === 'pending').length} অপেক্ষমাণ
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📢</div>
            <div className="stat-content">
              <h3>{notices.length}</h3>
              <p>নতুন নোটিশ</p>
              <span className="stat-detail">সাম্প্রতিক ঘোষণা</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <h3>{todayAttendance ? 'উপস্থিত' : 'অনুপস্থিত'}</h3>
              <p>আজকের উপস্থিতি</p>
              <span className="stat-detail">
                {todayAttendance?.checkIn ? 
                  new Date(todayAttendance.checkIn).toLocaleTimeString('bn-BD') : 
                  'চেক-ইন করুন'
                }
              </span>
            </div>
          </div>
        </div>

        {/* Attendance Section */}
        <div className="attendance-section">
          <h2>আজকের উপস্থিতি</h2>
          <div className="attendance-card">
            {!todayAttendance?.checkIn ? (
              <button onClick={handleCheckIn} className="btn btn-success btn-large">
                ✓ চেক-ইন করুন
              </button>
            ) : !todayAttendance?.checkOut ? (
              <div className="attendance-info">
                <p className="check-in-time">
                  চেক-ইন: {new Date(todayAttendance.checkIn).toLocaleTimeString('bn-BD')}
                </p>
                <button onClick={handleCheckOut} className="btn btn-danger btn-large">
                  ✗ চেক-আউট করুন
                </button>
              </div>
            ) : (
              <div className="attendance-complete">
                <p>✓ আজকের উপস্থিতি সম্পন্ন</p>
                <p className="time-info">
                  চেক-ইন: {new Date(todayAttendance.checkIn).toLocaleTimeString('bn-BD')} | 
                  চেক-আউট: {new Date(todayAttendance.checkOut).toLocaleTimeString('bn-BD')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* My Tasks */}
        <div className="tasks-section">
          <h2>আমার টাস্ক ({myTasks.length})</h2>
          {myTasks.length === 0 ? (
            <p className="no-data">কোনো টাস্ক নেই</p>
          ) : (
            <div className="tasks-grid">
              {myTasks.map(task => (
                <div key={task._id} className="task-card">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <span className={`badge priority-${task.priority}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="task-description">{task.description}</p>
                  <div className="task-meta">
                    <span className="due-date">
                      📅 {new Date(task.dueDate).toLocaleDateString('bn-BD')}
                    </span>
                    <span className={`badge status-${task.status}`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="task-actions">
                    {task.status === 'pending' && (
                      <button
                        onClick={() => updateTaskStatus(task._id, 'in_progress')}
                        className="btn btn-sm btn-primary"
                      >
                        শুরু করুন
                      </button>
                    )}
                    {task.status === 'in_progress' && (
                      <button
                        onClick={() => updateTaskStatus(task._id, 'completed')}
                        className="btn btn-sm btn-success"
                      >
                        সম্পন্ন করুন
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notices */}
        <div className="notices-section">
          <h2>সাম্প্রতিক নোটিশ</h2>
          {notices.length === 0 ? (
            <p className="no-data">কোনো নোটিশ নেই</p>
          ) : (
            <div className="notices-list">
              {notices.map(notice => (
                <div key={notice._id} className="notice-card">
                  <div className="notice-header">
                    <h3>{notice.title}</h3>
                    <span className={`badge priority-${notice.priority}`}>
                      {notice.priority}
                    </span>
                  </div>
                  <p className="notice-content">{notice.content}</p>
                  <div className="notice-footer">
                    <span className="notice-date">
                      📅 {new Date(notice.publishDate).toLocaleDateString('bn-BD')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDashboard;
