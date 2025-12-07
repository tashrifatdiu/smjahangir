import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Lock body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo" onClick={closeMenu}>এস এম জাহাঙ্গীর</Link>
          
          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="মেনু টগল করুন"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={closeMenu}>হোম</Link></li>
            <li><Link to="/about" onClick={closeMenu}>পরিচিতি</Link></li>
            <li><Link to="/vision" onClick={closeMenu}>দৃষ্টিভঙ্গি</Link></li>
            <li><Link to="/pioneers" onClick={closeMenu}>পথপ্রদর্শক</Link></li>
            <li><Link to="/team" onClick={closeMenu}>টিম প্যানেল</Link></li>
            <li><Link to="/journal" onClick={closeMenu}>সংবাদ</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>যোগাযোগ</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/admin/dashboard" onClick={closeMenu}>ড্যাশবোর্ড</Link></li>
                <li>
                  <button 
                    onClick={() => {
                      logout();
                      closeMenu();
                    }} 
                    className="btn-logout"
                  >
                    লগআউট
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/admin/login" onClick={closeMenu}>অ্যাডমিন</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
