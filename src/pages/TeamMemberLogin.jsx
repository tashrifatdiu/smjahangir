import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './TeamMemberLogin.css';

const TeamMemberLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://smbackend-uptj.onrender.com/team-member/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'লগইন ব্যর্থ হয়েছে');
      }

      // Store token and member info
      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', 'team_member');
      localStorage.setItem('memberInfo', JSON.stringify(data.member));
      
      // Navigate to team member dashboard
      navigate('/team/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="team-member-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>টিম সদস্য লগইন</h1>
            <p>আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
          </div>

          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>ইমেইল</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="আপনার ইমেইল লিখুন"
                required
              />
            </div>

            <div className="form-group">
              <label>পাসওয়ার্ড</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                required
              />
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
            </button>
          </form>

          <div className="login-footer">
            <p>অ্যাডমিন? <a href="/admin/login">এখানে লগইন করুন</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberLogin;
