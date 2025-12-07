import { useState } from 'react';
import fetchClient from '../utils/fetchClient';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await fetchClient('/contact', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setSuccess('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <img src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1920&h=400&fit=crop" alt="Contact us" />
        <div className="contact-hero-overlay"></div>
      </div>
      <div className="container">
        <h1>যোগাযোগ করুন</h1>
        
        <div className="contact-content">
          <div className="contact-info">
            <h2>আমাদের সাথে যোগাযোগ করুন</h2>
            <p>আমরা আপনার কাছ থেকে শুনতে চাই। আমাদের একটি বার্তা পাঠান এবং আমরা যত তাড়াতাড়ি সম্ভব সাড়া দেব।</p>
            
            <div className="info-item">
              <h3>ইমেইল</h3>
              <p>smjahangir@example.com</p>
            </div>
            
            <div className="info-item">
              <h3>ফোন</h3>
              <p>০১৭১২-৩৪৫৬৭৮</p>
            </div>
            
            <div className="info-item">
              <h3>অফিস</h3>
              <p>ঢাকা-১৮ আসন<br />নির্বাচনী অফিস</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">নাম *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">ইমেইল *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">বিষয়</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">বার্তা *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
