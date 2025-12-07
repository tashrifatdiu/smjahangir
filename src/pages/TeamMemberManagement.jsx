import { useState, useEffect } from 'react';
import fetchClient from '../utils/fetchClient';
import './TeamMemberManagement.css';

const TeamMemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'volunteer',
    position: '',
    ward: '',
    address: '',
    nid: '',
    emergencyContact: '',
    status: 'active',
    verified: false
  });
  const [filter, setFilter] = useState({ role: '', status: '', ward: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const data = await fetchClient('/team-member');
      setMembers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading members:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        const { password, ...updateData } = formData;
        await fetchClient(`/team-member/${editingMember._id}`, {
          method: 'PUT',
          body: JSON.stringify(updateData)
        });
      } else {
        await fetchClient('/team-member', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
      }
      loadMembers();
      resetForm();
      alert(editingMember ? 'সদস্য আপডেট হয়েছে!' : 'নতুন সদস্য যোগ হয়েছে!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      password: '',
      role: member.role,
      position: member.position,
      ward: member.ward || '',
      address: member.address || '',
      nid: member.nid || '',
      emergencyContact: member.emergencyContact || '',
      status: member.status,
      verified: member.verified
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('আপনি কি নিশ্চিত এই সদস্যকে মুছে ফেলতে চান?')) return;
    try {
      await fetchClient(`/team-member/${id}`, { method: 'DELETE' });
      loadMembers();
      alert('সদস্য মুছে ফেলা হয়েছে!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'volunteer',
      position: '',
      ward: '',
      address: '',
      nid: '',
      emergencyContact: '',
      status: 'active',
      verified: false
    });
    setEditingMember(null);
    setShowForm(false);
  };

  const filteredMembers = members.filter(member => {
    if (filter.role && member.role !== filter.role) return false;
    if (filter.status && member.status !== filter.status) return false;
    if (filter.ward && member.ward !== filter.ward) return false;
    return true;
  });

  if (loading) return <div className="loading">লোড হচ্ছে...</div>;

  return (
    <div className="team-management">
      <div className="container">
        <div className="page-header">
          <h1>টিম সদস্য ব্যবস্থাপনা</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'বাতিল করুন' : '+ নতুন সদস্য যোগ করুন'}
          </button>
        </div>

        {/* Filters */}
        <div className="filters">
          <select value={filter.role} onChange={(e) => setFilter({...filter, role: e.target.value})}>
            <option value="">সকল ভূমিকা</option>
            <option value="coordinator">সমন্বয়কারী</option>
            <option value="ward_leader">ওয়ার্ড নেতা</option>
            <option value="volunteer">স্বেচ্ছাসেবক</option>
            <option value="organizer">সংগঠক</option>
          </select>

          <select value={filter.status} onChange={(e) => setFilter({...filter, status: e.target.value})}>
            <option value="">সকল অবস্থা</option>
            <option value="active">সক্রিয়</option>
            <option value="inactive">নিষ্ক্রিয়</option>
            <option value="suspended">স্থগিত</option>
          </select>

          <input
            type="text"
            placeholder="ওয়ার্ড নম্বর"
            value={filter.ward}
            onChange={(e) => setFilter({...filter, ward: e.target.value})}
          />
        </div>

        {/* Form */}
        {showForm && (
          <div className="member-form">
            <h2>{editingMember ? 'সদস্য সম্পাদনা' : 'নতুন সদস্য যোগ করুন'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>নাম *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>ইমেইল *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>ফোন *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>

                {!editingMember && (
                  <div className="form-group">
                    <label>পাসওয়ার্ড *</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required={!editingMember}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>ভূমিকা *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    required
                  >
                    <option value="coordinator">সমন্বয়কারী</option>
                    <option value="ward_leader">ওয়ার্ড নেতা</option>
                    <option value="volunteer">স্বেচ্ছাসেবক</option>
                    <option value="organizer">সংগঠক</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>পদবী *</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>ওয়ার্ড</label>
                  <input
                    type="text"
                    value={formData.ward}
                    onChange={(e) => setFormData({...formData, ward: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>এনআইডি</label>
                  <input
                    type="text"
                    value={formData.nid}
                    onChange={(e) => setFormData({...formData, nid: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>জরুরি যোগাযোগ</label>
                  <input
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>অবস্থা</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="active">সক্রিয়</option>
                    <option value="inactive">নিষ্ক্রিয়</option>
                    <option value="suspended">স্থগিত</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>ঠিকানা</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    rows="3"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.verified}
                      onChange={(e) => setFormData({...formData, verified: e.target.checked})}
                    />
                    যাচাইকৃত সদস্য
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingMember ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
                </button>
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  বাতিল করুন
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Members Table */}
        <div className="members-table">
          <h2>সদস্য তালিকা ({filteredMembers.length})</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>নাম</th>
                  <th>ভূমিকা</th>
                  <th>পদবী</th>
                  <th>ওয়ার্ড</th>
                  <th>ফোন</th>
                  <th>অবস্থা</th>
                  <th>যাচাই</th>
                  <th>কার্যক্রম</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map(member => (
                  <tr key={member._id}>
                    <td>{member.name}</td>
                    <td>
                      <span className={`badge role-${member.role}`}>
                        {member.role === 'coordinator' && 'সমন্বয়কারী'}
                        {member.role === 'ward_leader' && 'ওয়ার্ড নেতা'}
                        {member.role === 'volunteer' && 'স্বেচ্ছাসেবক'}
                        {member.role === 'organizer' && 'সংগঠক'}
                      </span>
                    </td>
                    <td>{member.position}</td>
                    <td>{member.ward || '-'}</td>
                    <td>{member.phone}</td>
                    <td>
                      <span className={`badge status-${member.status}`}>
                        {member.status === 'active' && 'সক্রিয়'}
                        {member.status === 'inactive' && 'নিষ্ক্রিয়'}
                        {member.status === 'suspended' && 'স্থগিত'}
                      </span>
                    </td>
                    <td>
                      {member.verified ? (
                        <span className="verified">✓ যাচাইকৃত</span>
                      ) : (
                        <span className="unverified">অযাচাইকৃত</span>
                      )}
                    </td>
                    <td className="actions">
                      <button onClick={() => handleEdit(member)} className="btn btn-sm btn-secondary">
                        সম্পাদনা
                      </button>
                      <button onClick={() => handleDelete(member._id)} className="btn btn-sm btn-danger">
                        মুছুন
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberManagement;
