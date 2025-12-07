import { useState, useEffect } from 'react';
import fetchClient from '../utils/fetchClient';
import './Management.css';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    status: 'pending',
    dueDate: '',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tasksData, membersData] = await Promise.all([
        fetchClient('/task'),
        fetchClient('/team-member')
      ]);
      setTasks(tasksData);
      setMembers(membersData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await fetchClient(`/task/${editingTask._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData)
        });
      } else {
        await fetchClient('/task', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
      }
      loadData();
      resetForm();
      alert(editingTask ? 'টাস্ক আপডেট হয়েছে!' : 'নতুন টাস্ক তৈরি হয়েছে!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo._id || task.assignedTo,
      priority: task.priority,
      status: task.status,
      dueDate: new Date(task.dueDate).toISOString().slice(0, 10),
      notes: task.notes || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('আপনি কি নিশ্চিত এই টাস্ক মুছে ফেলতে চান?')) return;
    try {
      await fetchClient(`/task/${id}`, { method: 'DELETE' });
      loadData();
      alert('টাস্ক মুছে ফেলা হয়েছে!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      assignedTo: '',
      priority: 'medium',
      status: 'pending',
      dueDate: '',
      notes: ''
    });
    setEditingTask(null);
    setShowForm(false);
  };

  return (
    <div className="management-page">
      <div className="container">
        <div className="page-header">
          <h1>টাস্ক ম্যানেজমেন্ট</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'বাতিল করুন' : '+ নতুন টাস্ক তৈরি করুন'}
          </button>
        </div>

        {showForm && (
          <div className="form-card">
            <h2>{editingTask ? 'টাস্ক সম্পাদনা' : 'নতুন টাস্ক তৈরি করুন'}</h2>
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
                  <label>বরাদ্দকৃত সদস্য *</label>
                  <select
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                    required
                  >
                    <option value="">নির্বাচন করুন</option>
                    {members.map(member => (
                      <option key={member._id} value={member._id}>
                        {member.name} - {member.position}
                      </option>
                    ))}
                  </select>
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
                    <option value="pending">অপেক্ষমাণ</option>
                    <option value="in_progress">চলমান</option>
                    <option value="completed">সম্পন্ন</option>
                    <option value="cancelled">বাতিল</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>সময়সীমা *</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    required
                  />
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
                  <label>নোট</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows="3"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingTask ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
                </button>
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  বাতিল করুন
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="data-table">
          <h2>টাস্ক তালিকা ({tasks.length})</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>শিরোনাম</th>
                  <th>বরাদ্দকৃত</th>
                  <th>অগ্রাধিকার</th>
                  <th>অবস্থা</th>
                  <th>সময়সীমা</th>
                  <th>কার্যক্রম</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task._id}>
                    <td>{task.title}</td>
                    <td>{task.assignedTo?.name || 'N/A'}</td>
                    <td><span className={`badge priority-${task.priority}`}>{task.priority}</span></td>
                    <td><span className={`badge status-${task.status}`}>{task.status}</span></td>
                    <td>{new Date(task.dueDate).toLocaleDateString('bn-BD')}</td>
                    <td className="actions">
                      <button onClick={() => handleEdit(task)} className="btn btn-sm btn-secondary">
                        সম্পাদনা
                      </button>
                      <button onClick={() => handleDelete(task._id)} className="btn btn-sm btn-danger">
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

export default TaskManagement;
