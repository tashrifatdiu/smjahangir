import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchClient from '../utils/fetchClient';
import './JournalPage.css';

const JournalPage = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadJournals();
  }, [currentPage]);

  const loadJournals = async () => {
    try {
      const data = await fetchClient(`/journal/all?page=${currentPage}&limit=9`);
      setJournals(data.journals);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error loading journals:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">লোড হচ্ছে...</div>;

  return (
    <div className="journal-page">
      {/* Hero Section */}
      <div className="journal-hero">
        <div className="container">
          <h1>সংবাদ ও আপডেট</h1>
          <p className="hero-subtitle">সর্বশেষ ক্যাম্পেইন সংবাদ এবং কার্যক্রম</p>
        </div>
      </div>

      <div className="container">
        {journals.length === 0 ? (
          <div className="no-journals">
            <p>এখনও কোনো সংবাদ প্রকাশিত হয়নি</p>
          </div>
        ) : (
          <>
            {/* Featured Article (First one) */}
            {journals.length > 0 && (
              <div className="featured-article">
                <Link to={`/journal/${journals[0]._id}`} className="featured-link">
                  {journals[0].imageUrl && (
                    <div className="featured-image">
                      <img src={journals[0].imageUrl} alt={journals[0].title} />
                      <div className="featured-badge">বিশেষ সংবাদ</div>
                    </div>
                  )}
                  <div className="featured-content">
                    <h2>{journals[0].title}</h2>
                    <p className="featured-excerpt">
                      {journals[0].excerpt || journals[0].content.substring(0, 200) + '...'}
                    </p>
                    <div className="featured-meta">
                      <span className="date">
                        📅 {new Date(journals[0].createdAt).toLocaleDateString('bn-BD')}
                      </span>
                      <span className="read-more">আরও পড়ুন →</span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* News Grid */}
            <div className="news-grid">
              {journals.slice(1).map((journal) => (
                <article key={journal._id} className="news-card">
                  <Link to={`/journal/${journal._id}`} className="news-link">
                    {journal.imageUrl && (
                      <div className="news-image">
                        <img src={journal.imageUrl} alt={journal.title} />
                      </div>
                    )}
                    <div className="news-content">
                      <h3>{journal.title}</h3>
                      <p className="news-excerpt">
                        {journal.excerpt || journal.content.substring(0, 120) + '...'}
                      </p>
                      <div className="news-meta">
                        <span className="date">
                          📅 {new Date(journal.createdAt).toLocaleDateString('bn-BD')}
                        </span>
                        <span className="author">✍️ {journal.author}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn-page"
                >
                  ← পূর্ববর্তী
                </button>
                <span className="page-info">
                  পৃষ্ঠা {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn-page"
                >
                  পরবর্তী →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
