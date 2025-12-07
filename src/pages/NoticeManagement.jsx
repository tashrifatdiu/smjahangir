import { useState, useEffect } from 'react';
import fetchClient from '../utils/fetchClient';
import './Management.css';

const NoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium',
    targetAudience: ['all'],
    status: 'draft',
    publishDate: new Date().toISOString().slice(0, 10),
    expiryDate: ''
  });

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const data = await fetchClient('/notice');
      setNotices(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNotice) {
        await fetchClient(`/notice/${editingNotice._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData)
        });
      } else {
        await fetchClient('/notice', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
      }
      loadNotices();
      resetForm();
      alert(editingNotice ? 'নোটিশ আপডেট হয়েছে!' : 'নতুন নোটিশ তৈরি হয়েছে!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      priority: notice.priority,
      targetAudience: notice.targetAudience,
      status: notice.status,
      publishDate: new Date(notice.publishDate).toISOString().slice(0, 10),
      expiryDate: notice.expiryDate ? new Date(notice.expiryDate).toISOString().slice(0, 10) : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('আপনি কি নিশ্চিত এই নোটিশ মুছে ফেলতে চান?')) return;
    try {
      await fetchClient(`/notice/${id}`, { method: 'DELETE' });
      loadNotices();
      alert('নোটিশ মুছে ফেলা হয়েছে!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      priority: 'medium',
      targetAudience: ['all'],
      status: 'draft',
      publishDate: new Date().toISOString().slice(0, 10),
      expiryDate: ''
    });
    setEditingNotice(null);
    setShowForm(false);
  };

  return (
    <div className="management-page">
      <div className="container">
        <div className="page-header">
          <h1>নোটিশ ম্যানেজমেন্ট</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'বাতিল করুন' : '+ নতুন নোটিশ তৈরি করুন'}
          </button>
        </div>

        {showForm && (
          <div className="form-card">
            <h2>{editingNotice ? 'নোটিশ সম্পাদনা' : 'নতুন নোটিশ তৈরি করুন'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>শিরোনাম *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>অগ্রাধিকার *</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    required
                  >
                    <option value="low">নিম্ন</option>
                    <option value="medium">মাঝারি</option>
                    <option value="high">উচ্চ</option>
                    <option value="urgent">জরুরি</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>অবস্থা</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="draft">খসড়া</option>
                    <option value="published">প্রকাশিত</option>
                    <option value="archived">সংরক্ষিত</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>প্রকাশের তারিখ</label>
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>মেয়াদ শেষ</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  />
                </div>

                <div className="form-group full-width">
                  <label>লক্ষ্য দর্শক</label>
                  <select
                    multiple
                    value={formData.targetAudience}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      setFormData({...formData, targetAudience: selected});
                    }}
                    size="5"
                  >
                    <option value="all">সকলের জন্য</option>
                    <option value="coordinators">সমন্বয়কারী</option>
                    <option value="ward_leaders">ওয়ার্ড নেতা</option>
                    <option value="volunteers">স্বেচ্ছাসেবক</option>
                    <option value="organizers">সংগঠক</option>
                  </select>
                  <small>একাধিক নির্বাচনের জন্য Ctrl/Cmd চাপুন</small>
                </div>

                <div className="form-group full-width">
                  <label>বিষয়বস্তু *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows="8"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingNotice ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
                </button>
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  বাতিল করুন
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="data-table">
          <h2>নোটিশ তালিকা ({notices.length})</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>শিরোনাম</th>
                  <th>অগ্রাধিকার</th>
                  <th>লক্ষ্য দর্শক</th>
                  <th>অবস্থা</th>
                  <th>প্রকাশের তারিখ</th>
                  <th>কার্যক্রম</th>
                </tr>
              </thead>
              <tbody>
                {notices.map(notice => (
                  <tr key={notice._id}>
                    <td>{notice.title}</td>
                    <td><span className={`badge priority-${notice.priority}`}>{notice.priority}</span></td>
                    <td>{notice.targetAudience.join(', ')}</td>
                    <td><span className={`badge status-${notice.status}`}>{notice.status}</span></td>
                    <td>{new Date(notice.publishDate).toLocaleDateString('bn-BD')}</td>
                    <td className="actions">
                      <button onClick={() => handleEdit(notice)} className="btn btn-sm btn-secondary">
                        সম্পাদনা
                      </button>
                      <button onClick={() => handleDelete(notice._id)} className="btn btn-sm btn-danger">
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

export default NoticeManagement;
