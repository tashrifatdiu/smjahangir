import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-background" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        <div className="container">
          <h1>এস এম জাহাঙ্গীর হোসেনের প্রচারণায় স্বাগতম</h1>
          <p className="hero-subtitle">একসাথে গড়ব উন্নত ভবিষ্যৎ</p>
          <button className="btn btn-primary">আমাদের আন্দোলনে যোগ দিন</button>
        </div>
      </section>

      <section className="politician-intro">
        <div className="container">
          <div className="politician-content">
            <div className="politician-image-wrapper">
              <div className="image-glow"></div>
              <img 
                src="/images/sm_jahangir.jpg" 
                alt="এস এম জাহাঙ্গীর হোসেন" 
                className="politician-image"
              />
              <div className="image-border"></div>
            </div>
            <div className="politician-text">
              <h2>আপনার ভবিষ্যৎ নেতার সাথে পরিচিত হন</h2>
              <p className="politician-name">এস এম জাহাঙ্গীর হোসেন</p>
              <p className="politician-title">ঢাকা-১৮ আসনের বিএনপি মনোনীত প্রার্থী</p>
              <p className="politician-description">
                তৃণমূল থেকে উঠে আসা একজন নিবেদিতপ্রাণ নেতা। ৩০ বছরের রাজনৈতিক জীবনে 
                কখনো মাথা নত করেননি অন্যায়ের কাছে। সাধারণ মানুষের পাশে দাঁড়ানোর 
                প্রতিশ্রুতিতে অবিচল। ধানের শীষের প্রতীকে লড়াই করছেন জনগণের অধিকার 
                এবং উন্নত ভবিষ্যতের জন্য।
              </p>
              <div className="politician-stats">
                <div className="stat-item">
                  <span className="stat-number">৩০+</span>
                  <span className="stat-label">বছরের অভিজ্ঞতা</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">৫০ লক্ষ+</span>
                  <span className="stat-label">সমর্থক</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">১০০+</span>
                  <span className="stat-label">উদ্যোগ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="highlights">
        <div className="container">
          <h2>প্রচারণার মূল বিষয়</h2>
          <div className="highlight-grid">
            <div className="highlight-card">
              <div className="card-icon">🎓</div>
              <h3>শিক্ষা সংস্কার</h3>
              <p>সকল শিক্ষার্থীর জন্য মানসম্মত শিক্ষায় বিনিয়োগ</p>
            </div>
            <div className="highlight-card">
              <div className="card-icon">🏥</div>
              <h3>স্বাস্থ্যসেবা</h3>
              <p>প্রতিটি পরিবারের জন্য সাশ্রয়ী স্বাস্থ্যসেবা নিশ্চিত করা</p>
            </div>
            <div className="highlight-card">
              <div className="card-icon">💼</div>
              <h3>অর্থনৈতিক উন্নয়ন</h3>
              <p>কর্মসংস্থান সৃষ্টি এবং স্থানীয় ব্যবসায়ীদের সহায়তা</p>
            </div>
          </div>
        </div>
      </section>

      <section className="constituency-info">
        <div className="container">
          <h2>ঢাকা-১৮ আসন সম্পর্কে</h2>
          <div className="constituency-content">
            <div className="constituency-text">
              <p className="constituency-intro">
                ঢাকা-১৮ হলো বাংলাদেশের জাতীয় সংসদের ৩০০টি নির্বাচনী আসনের মধ্যে ১৯১তম আসন। 
                এই আসনটি ঢাকা উত্তর সিটি কর্পোরেশনের অন্তর্গত একটি গুরুত্বপূর্ণ নির্বাচনী এলাকা।
              </p>
              <div className="constituency-details">
                <h3>আসনের সীমানা</h3>
                <p>
                  ঢাকা-১৮ আসনটি ঢাকা উত্তর সিটি কর্পোরেশনের <strong>১৪টি ওয়ার্ড</strong> নিয়ে গঠিত:
                </p>
                <div className="ward-list">
                  <span className="ward-badge">ওয়ার্ড ০১</span>
                  <span className="ward-badge">ওয়ার্ড ১৭</span>
                  <span className="ward-badge">ওয়ার্ড ৪৩</span>
                  <span className="ward-badge">ওয়ার্ড ৪৪</span>
                  <span className="ward-badge">ওয়ার্ড ৪৫</span>
                  <span className="ward-badge">ওয়ার্ড ৪৬</span>
                  <span className="ward-badge">ওয়ার্ড ৪৭</span>
                  <span className="ward-badge">ওয়ার্ড ৪৮</span>
                  <span className="ward-badge">ওয়ার্ড ৪৯</span>
                  <span className="ward-badge">ওয়ার্ড ৫০</span>
                  <span className="ward-badge">ওয়ার্ড ৫১</span>
                  <span className="ward-badge">ওয়ার্ড ৫২</span>
                  <span className="ward-badge">ওয়ার্ড ৫৩</span>
                  <span className="ward-badge">ওয়ার্ড ৫৪</span>
                </div>
                <h3>ইতিহাস</h3>
                <p>
                  ২০০১ সালের আদমশুমারিতে জনসংখ্যা বৃদ্ধি লক্ষ করার পর, বাংলাদেশ নির্বাচন কমিশন 
                  ২০০৮ সালের সাধারণ নির্বাচনের পূর্বে এই নির্বাচনী আসন সৃষ্টি করে। পুনর্নির্ধারণের 
                  ফলে ঢাকা মহানগর এলাকায় ৭টি নতুন আসন যোগ করা হয়, যার ফলে রাজধানীতে আসন সংখ্যা 
                  ১৩টি থেকে বৃদ্ধি পেয়ে ২০টি-তে দাঁড়ায়।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto-preview">
        <div className="container">
          <h2>আমাদের লক্ষ্য</h2>
          <p>
            আমরা এমন একটি ভবিষ্যতে বিশ্বাস করি যেখানে প্রতিটি কণ্ঠস্বর শোনা যায়, 
            প্রতিটি পরিবার সমৃদ্ধ হয় এবং প্রতিটি সম্প্রদায় উন্নতি লাভ করে। 
            আমাদের লক্ষ্য হল মানুষকে একত্রিত করা, বিভাজন দূর করা এবং স্থায়ী 
            ইতিবাচক পরিবর্তন সৃষ্টি করা।
          </p>
        </div>
      </section>

      <section className="call-to-action">
        <div className="container">
          <div className="cta-content">
            <h2>চলুন একসাথে গড়ি নতুন ভবিষ্যৎ</h2>
            <p className="cta-message">
              ধানের শীষের প্রার্থী এস এম জাহাঙ্গীর হোসেনকে সমর্থন করুন। 
              ঢাকা-১৮ আসনে শুরু করুন এক নতুন সূচনার।
            </p>
            <div className="cta-reasons">
              <div className="reason-item">
                <span className="reason-icon">✓</span>
                <span>৩০ বছরের প্রমাণিত নেতৃত্ব</span>
              </div>
              <div className="reason-item">
                <span className="reason-icon">✓</span>
                <span>তৃণমূল থেকে উঠে আসা জনগণের নেতা</span>
              </div>
              <div className="reason-item">
                <span className="reason-icon">✓</span>
                <span>সততা ও স্বচ্ছতার প্রতীক</span>
              </div>
              <div className="reason-item">
                <span className="reason-icon">✓</span>
                <span>৫০ লক্ষ সমর্থকের বিশ্বাস</span>
              </div>
            </div>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-large">ধানের শীষে ভোট দিন</button>
              <a href="#contact" className="btn btn-secondary btn-large">যোগাযোগ করুন</a>
            </div>
            <p className="cta-slogan">
              "প্রতিকূলতার মাঝেও দৃঢ়তায় ধানের শীষের কান্ডারী!"
            </p>
          </div>
        </div>
      </section>

      <section className="supporters-section">
        <div className="container">
          <div className="supporter-counter">
            <div className="counter-box">
              <span className="counter-number">৫০,০০,০০০+</span>
              <span className="counter-label">গর্বিত সমর্থক</span>
            </div>
            <p className="counter-message">লক্ষ লক্ষ মানুষের সাথে যোগ দিন যারা উন্নত ভবিষ্যতে বিশ্বাস করেন</p>
          </div>
          <h2>আমাদের সমর্থকদের সাথে পরিচিত হন</h2>
          <div className="supporters-grid">
            <div className="supporter-image">
              <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop" alt="Supporter" />
            </div>
            <div className="supporter-image">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" alt="Supporter" />
            </div>
            <div className="supporter-image">
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop" alt="Supporter" />
            </div>
            <div className="supporter-image">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop" alt="Supporter" />
            </div>
            <div className="supporter-image">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop" alt="Supporter" />
            </div>
            <div className="supporter-image">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop" alt="Supporter" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
