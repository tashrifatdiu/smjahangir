import { useState, useEffect } from 'react';
import fetchClient from '../utils/fetchClient';
import './Management.css';

const AttendanceManagement = () => {
  const [attendance, setAttendance] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [summary, setSummary] = useState({ present: 0, absent: 0, late: 0, halfDay: 0, leave: 0 });

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  const loadData = async () => {
    try {
      const [attendanceData, membersData] = await Promise.all([
        fetchClient(`/attendance?startDate=${selectedDate}&endDate=${selectedDate}`),
        fetchClient('/team-member')
      ]);
      setAttendance(attendanceData);
      setMembers(membersData);
      
      // Calculate summary
      const summary = {
        present: attendanceData.filter(a => a.status === 'present').length,
        absent: attendanceData.filter(a => a.status === 'absent').length,
        late: attendanceData.filter(a => a.status === 'late').length,
        halfDay: attendanceData.filter(a => a.status === 'half_day').length,
        leave: attendanceData.filter(a => a.status === 'leave').length
      };
      setSummary(summary);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const markAttendance = async (memberId, status) => {
    try {
      await fetchClient('/attendance/mark', {
        method: 'POST',
        body: JSON.stringify({
          teamMember: memberId,
          date: selectedDate,
          status,
          checkIn: status === 'present' || status === 'late' ? new Date() : null
        })
      });
      loadData();
      alert('উপস্থিতি রেকর্ড করা হয়েছে!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const getMemberAttendance = (memberId) => {
    return attendance.find(a => a.teamMember._id === memberId);
  };

  return (
    <div className="management-page">
      <div className="container">
        <div className="page-header">
          <h1>উপস্থিতি ব্যবস্থাপনা</h1>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="btn"
          />
        </div>

        {/* Summary Cards */}
        <div className="attendance-grid">
          <div className="attendance-card">
            <h3>উপস্থিত</h3>
            <div className="count" style={{color: '#10b981'}}>{summary.present}</div>
          </div>
          <div className="attendance-card">
            <h3>অনুপস্থিত</h3>
            <div className="count" style={{color: '#dc2626'}}>{summary.absent}</div>
          </div>
          <div className="attendance-card">
            <h3>বিলম্বিত</h3>
            <div className="count" style={{color: '#f59e0b'}}>{summary.late}</div>
          </div>
          <div className="attendance-card">
            <h3>অর্ধদিবস</h3>
            <div className="count" style={{color: '#3b82f6'}}>{summary.halfDay}</div>
          </div>
          <div className="attendance-card">
            <h3>ছুটি</h3>
            <div className="count" style={{color: '#8b5cf6'}}>{summary.leave}</div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="data-table">
          <h2>সদস্য উপস্থিতি - {new Date(selectedDate).toLocaleDateString('bn-BD')}</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>নাম</th>
                  <th>ভূমিকা</th>
                  <th>পদবী</th>
                  <th>চেক-ইন</th>
                  <th>চেক-আউট</th>
                  <th>অবস্থা</th>
                  <th>কার্যক্রম</th>
                </tr>
              </thead>
              <tbody>
                {members.map(member => {
                  const att = getMemberAttendance(member._id);
                  return (
                    <tr key={member._id}>
                      <td>{member.name}</td>
                      <td>{member.role}</td>
                      <td>{member.position}</td>
                      <td>{att?.checkIn ? new Date(att.checkIn).toLocaleTimeString('bn-BD') : '-'}</td>
                      <td>{att?.checkOut ? new Date(att.checkOut).toLocaleTimeString('bn-BD') : '-'}</td>
                      <td>
                        {att ? (
                          <span className={`badge status-${att.status}`}>
                            {att.status === 'present' && 'উপস্থিত'}
                            {att.status === 'absent' && 'অনুপস্থিত'}
                            {att.status === 'late' && 'বিলম্বিত'}
                            {att.status === 'half_day' && 'অর্ধদিবস'}
                            {att.status === 'leave' && 'ছুটি'}
                          </span>
                        ) : (
                          <span className="badge">রেকর্ড নেই</span>
                        )}
                      </td>
                      <td className="actions">
                        <button
                          onClick={() => markAttendance(member._id, 'present')}
                          className="btn btn-sm btn-success"
                        >
                          উপস্থিত
                        </button>
                        <button
                          onClick={() => markAttendance(member._id, 'absent')}
                          className="btn btn-sm btn-danger"
                        >
                          অনুপস্থিত
                        </button>
                        <button
                          onClick={() => markAttendance(member._id, 'late')}
                          className="btn btn-sm btn-secondary"
                        >
                          বিলম্বিত
                        </button>
                        <button
                          onClick={() => markAttendance(member._id, 'leave')}
                          className="btn btn-sm btn-secondary"
                        >
                          ছুটি
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;
