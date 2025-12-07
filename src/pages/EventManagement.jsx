import { useState, useEffect } from 'react';
import fetchClient from '../utils/fetchClient';
import './Management.css';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'rally',
    location: '',
    startDate: '',
    endDate: '',
    participants: [],
    expectedAttendees: 0,
    actualAttendees: 0,
    status: 'scheduled'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [eventsData, membersData] = await Promise.all([
        fetchClient('/event'),
        fetchClient('/team-member')
      ]);
      setEvents(eventsData);
      setMembers(membersData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await fetchClient(`/event/${editingEvent._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData)
        });
      } else {
        await fetchClient('/event', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
      }
      loadData();
      resetForm();
      alert(editingEvent ? 'ইভেন্ট আপডেট হয়েছে!' : 'নতুন ইভেন্ট তৈরি হয়েছে!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      location: event.location,
      startDate: new Date(event.startDate).toISOString().slice(0, 16),
      endDate: new Date(event.endDate).toISOString().slice(0, 16),
      participants: event.participants.map(p => p._id || p),
      expectedAttendees: event.expectedAttendees,
      actualAttendees: event.actualAttendees,
      status: event.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('আপনি কি নিশ্চিত এই ইভেন্ট মুছে ফেলতে চান?')) return;
    try {
      await fetchClient(`/event/${id}`, { method: 'DELETE' });
      loadData();
      alert('ইভেন্ট মুছে ফেলা হয়েছে!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      eventType: 'rally',
      location: '',
      startDate: '',
      endDate: '',
      participants: [],
      expectedAttendees: 0,
      actualAttendees: 0,
      status: 'scheduled'
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  return (
    <div className="management-page">
      <div className="container">
        <div className="page-header">
          <h1>ইভেন্ট ম্যানেজমেন্ট</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'বাতিল করুন' : '+ নতুন ইভেন্ট তৈরি করুন'}
          </button>
        </div>

        {showForm && (
          <div className="form-card">
            <h2>{editingEvent ? 'ইভেন্ট সম্পাদনা' : 'নতুন ইভেন্ট তৈরি করুন'}</h2>
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
                  <label>ইভেন্ট ধরন *</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                    required
                  >
                    <option value="rally">সমাবেশ</option>
                    <option value="meeting">সভা</option>
                    <option value="door_to_door">দরজায় দরজায়</option>
                    <option value="public_gathering">জনসভা</option>
                    <option value="training">প্রশিক্ষণ</option>
                    <option value="other">অন্যান্য</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>স্থান *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>শুরুর সময় *</label>
                  <input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>শেষ সময় *</label>
                  <input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>প্রত্যাশিত উপস্থিতি</label>
                  <input
                    type="number"
                    value={formData.expectedAttendees}
                    onChange={(e) => setFormData({...formData, expectedAttendees: parseInt(e.target.value)})}
                  />
                </div>

                <div className="form-group">
                  <label>প্রকৃত উপস্থিতি</label>
                  <input
                    type="number"
                    value={formData.actualAttendees}
                    onChange={(e) => setFormData({...formData, actualAttendees: parseInt(e.target.value)})}
                  />
                </div>

                <div className="form-group">
                  <label>অবস্থা</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="scheduled">নির্ধারিত</option>
                    <option value="ongoing">চলমান</option>
                    <option value="completed">সম্পন্ন</option>
                    <option value="cancelled">বাতিল</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>বিবরণ *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>অংশগ্রহণকারী</label>
                  <select
                    multiple
                    value={formData.participants}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      setFormData({...formData, participants: selected});
                    }}
                    size="5"
                  >
                    {members.map(member => (
                      <option key={member._id} value={member._id}>
                        {member.name} - {member.position}
                      </option>
                    ))}
                  </select>
                  <small>একাধিক নির্বাচনের জন্য Ctrl/Cmd চাপুন</small>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingEvent ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
                </button>
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  বাতিল করুন
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="data-table">
          <h2>ইভেন্ট তালিকা ({events.length})</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>শিরোনাম</th>
                  <th>ধরন</th>
                  <th>স্থান</th>
                  <th>তারিখ</th>
                  <th>উপস্থিতি</th>
                  <th>অবস্থা</th>
                  <th>কার্যক্রম</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event._id}>
                    <td>{event.title}</td>
                    <td><span className="badge">{event.eventType}</span></td>
                    <td>{event.location}</td>
                    <td>{new Date(event.startDate).toLocaleDateString('bn-BD')}</td>
                    <td>{event.actualAttendees}/{event.expectedAttendees}</td>
                    <td><span className={`badge status-${event.status}`}>{event.status}</span></td>
                    <td className="actions">
                      <button onClick={() => handleEdit(event)} className="btn btn-sm btn-secondary">
                        সম্পাদনা
                      </button>
                      <button onClick={() => handleDelete(event._id)} className="btn btn-sm btn-danger">
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

export default EventManagement;
