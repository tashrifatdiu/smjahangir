import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import fetchClient from '../utils/fetchClient';
import './JournalDetailPage.css';

const JournalDetailPage = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);
  const [relatedJournals, setRelatedJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJournal();
    loadRelatedJournals();
    window.scrollTo(0, 0);
  }, [id]);

  const loadJournal = async () => {
    try {
      const data = await fetchClient(`/journal/${id}`);
      setJournal(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading journal:', error);
      setLoading(false);
    }
  };

  const loadRelatedJournals = async () => {
    try {
      const data = await fetchClient('/journal/all?limit=3');
      setRelatedJournals(data.journals.filter(j => j._id !== id).slice(0, 3));
    } catch (error) {
      console.error('Error loading related journals:', error);
    }
  };

  if (loading) return <div className="loading">লোড হচ্ছে...</div>;
  if (!journal) return <div className="error">সংবাদ পাওয়া যায়নি</div>;

  return (
    <div className="journal-detail-page">
      {/* Hero Section with Image */}
      {journal.imageUrl && (
        <div className="article-hero">
          <img src={journal.imageUrl} alt={journal.title} />
          <div className="hero-overlay"></div>
        </div>
      )}

      {/* Article Content */}
      <div className="article-container">
        <div className="container">
          <div className="article-wrapper">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
              <Link to="/">হোম</Link>
              <span>›</span>
              <Link to="/journal">সংবাদ</Link>
              <span>›</span>
              <span>{journal.title}</span>
            </nav>

            {/* Article Header */}
            <header className="article-header">
              <h1>{journal.title}</h1>
              <div className="article-meta">
                <div className="meta-item">
                  <span className="icon">📅</span>
                  <span>{new Date(journal.createdAt).toLocaleDateString('bn-BD', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="meta-item">
                  <span className="icon">✍️</span>
                  <span>{journal.author}</span>
                </div>
                <div className="meta-item">
                  <span className="icon">🕐</span>
                  <span>{new Date(journal.createdAt).toLocaleTimeString('bn-BD', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>
            </header>

            {/* Article Body */}
            <article className="article-body">
              {journal.excerpt && (
                <div className="article-excerpt">
                  {journal.excerpt}
                </div>
              )}
              <div 
                className="article-content"
                dangerouslySetInnerHTML={{ __html: journal.content }}
              />
            </article>

            {/* Share Section */}
            <div className="article-footer">
              <div className="share-section">
                <h3>শেয়ার করুন</h3>
                <div className="share-buttons">
                  <button className="share-btn facebook">
                    📘 Facebook
                  </button>
                  <button className="share-btn twitter">
                    🐦 Twitter
                  </button>
                  <button className="share-btn whatsapp">
                    💬 WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedJournals.length > 0 && (
            <aside className="related-articles">
              <h2>আরও সংবাদ</h2>
              <div className="related-grid">
                {relatedJournals.map((related) => (
                  <Link
                    key={related._id}
                    to={`/journal/${related._id}`}
                    className="related-card"
                  >
                    {related.imageUrl && (
                      <div className="related-image">
                        <img src={related.imageUrl} alt={related.title} />
                      </div>
                    )}
                    <div className="related-content">
                      <h3>{related.title}</h3>
                      <p className="related-date">
                        {new Date(related.createdAt).toLocaleDateString('bn-BD')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          )}

          {/* Back Button */}
          <div className="back-section">
            <Link to="/journal" className="btn-back">
              ← সকল সংবাদ দেখুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalDetailPage;
