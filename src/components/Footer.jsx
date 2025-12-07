import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} এস এম জাহাঙ্গীর হোসেন। সর্বস্বত্ব সংরক্ষিত।</p>
      </div>
    </footer>
  );
};

export default Footer;
