import './TeamPanel.css';

const TeamPanel = () => {
  return (
    <div className="team-panel-page">
      <div className="panel-hero">
        <div className="container">
          <h1>অফিসিয়াল টিম প্যানেল</h1>
          <p className="panel-subtitle">সাংগঠনিক কাঠামো ও যাচাইকৃত দলীয় সদস্য</p>
          <div className="warning-banner">
            <span className="warning-icon">⚠️</span>
            <p>
              <strong>সতর্কতা:</strong> এই তালিকায় নেই এমন কেউ এস এম জাহাঙ্গীর হোসেনের নামে 
              কোনো কাজ করলে তা অননুমোদিত এবং প্রতারণামূলক বলে গণ্য হবে।
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Pyramid Organizational Structure */}
        <div className="pyramid-tree">
          {/* Level 1 - Leader (Top of Pyramid) */}
          <div className="pyramid-level level-1">
            <div className="pyramid-node">
              <div className="node-avatar leader">
                <img src="/src/images/sm_jahangir.jpg" alt="এস এম জাহাঙ্গীর হোসেন" />
                <span className="verified-check">✓</span>
              </div>
              <div className="node-info">
                <h3>এস এম জাহাঙ্গীর হোসেন</h3>
                <p className="node-title">প্রার্থী, ঢাকা-১৮</p>
              </div>
            </div>
          </div>

          {/* Pyramid Connector from Level 1 to Level 2 */}
          <svg className="pyramid-connector connector-1-2" viewBox="0 0 400 80" preserveAspectRatio="none">
            <line x1="200" y1="0" x2="100" y2="80" stroke="#9ca3af" strokeWidth="3"/>
            <line x1="200" y1="0" x2="300" y2="80" stroke="#9ca3af" strokeWidth="3"/>
          </svg>

          {/* Level 2 - Coordinators */}
          <div className="pyramid-level level-2">
            <div className="pyramid-node">
              <div className="node-avatar coordinator">
                <img src="https://ui-avatars.com/api/?name=Coordinator+1&background=dc2626&color=fff&size=200" alt="সমন্বয়কারী ১" />
                <span className="verified-check">✓</span>
              </div>
              <div className="node-info">
                <h3>সমন্বয়কারী ১</h3>
                <p className="node-title">প্রধান সমন্বয়কারী</p>
              </div>
            </div>

            <div className="pyramid-node">
              <div className="node-avatar coordinator">
                <img src="https://ui-avatars.com/api/?name=Coordinator+2&background=16a34a&color=fff&size=200" alt="সমন্বয়কারী ২" />
                <span className="verified-check">✓</span>
              </div>
              <div className="node-info">
                <h3>সমন্বয়কারী ২</h3>
                <p className="node-title">সহ-সমন্বয়কারী</p>
              </div>
            </div>
          </div>

          {/* Pyramid Connector from Level 2 to Level 3 */}
          <svg className="pyramid-connector connector-2-3" viewBox="0 0 800 80" preserveAspectRatio="none">
            <line x1="200" y1="0" x2="100" y2="80" stroke="#9ca3af" strokeWidth="3"/>
            <line x1="200" y1="0" x2="300" y2="80" stroke="#9ca3af" strokeWidth="3"/>
            <line x1="600" y1="0" x2="500" y2="80" stroke="#9ca3af" strokeWidth="3"/>
            <line x1="600" y1="0" x2="700" y2="80" stroke="#9ca3af" strokeWidth="3"/>
          </svg>

          {/* Level 3 - Ward Leaders (Bottom of Pyramid) */}
          <div className="pyramid-level level-3">
            <div className="pyramid-node">
              <div className="node-avatar ward">
                <img src="https://ui-avatars.com/api/?name=Ward+01&background=fbbf24&color=000&size=200" alt="ওয়ার্ড ০১" />
                <span className="verified-check">✓</span>
              </div>
              <div className="node-info">
                <h3>ওয়ার্ড নেতা ০১</h3>
                <p className="node-title">ওয়ার্ড ০১</p>
              </div>
            </div>

            <div className="pyramid-node">
              <div className="node-avatar ward">
                <img src="https://ui-avatars.com/api/?name=Ward+17&background=fbbf24&color=000&size=200" alt="ওয়ার্ড ১৭" />
                <span className="verified-check">✓</span>
              </div>
              <div className="node-info">
                <h3>ওয়ার্ড নেতা ১৭</h3>
                <p className="node-title">ওয়ার্ড ১৭</p>
              </div>
            </div>

            <div className="pyramid-node">
              <div className="node-avatar ward">
                <img src="https://ui-avatars.com/api/?name=Ward+43&background=fbbf24&color=000&size=200" alt="ওয়ার্ড ৪৩" />
                <span className="verified-check">✓</span>
              </div>
              <div className="node-info">
                <h3>ওয়ার্ড নেতা ৪৩</h3>
                <p className="node-title">ওয়ার্ড ৪৩</p>
              </div>
            </div>

            <div className="pyramid-node">
              <div className="node-avatar ward">
                <img src="https://ui-avatars.com/api/?name=Ward+44&background=fbbf24&color=000&size=200" alt="ওয়ার্ড ৪৪" />
                <span className="verified-check">✓</span>
              </div>
              <div className="node-info">
                <h3>ওয়ার্ড নেতা ৪৪</h3>
                <p className="node-title">ওয়ার্ড ৪৪</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="tree-legend">
          <div className="legend-item">
            <span className="legend-icon verified">✓</span>
            <span>যাচাইকৃত সদস্য</span>
          </div>
          <div className="legend-item">
            <span className="legend-line"></span>
            <span>সাংগঠনিক সম্পর্ক</span>
          </div>
        </div>

        {/* Verification Notice */}
        <section className="verification-notice">
          <div className="notice-card">
            <h3>কীভাবে যাচাই করবেন?</h3>
            <div className="verification-steps">
              <div className="step">
                <span className="step-number">১</span>
                <p>এই তালিকায় ব্যক্তির নাম ও ছবি মিলিয়ে দেখুন</p>
              </div>
              <div className="step">
                <span className="step-number">২</span>
                <p>যাচাইকৃত চিহ্ন (✓) আছে কিনা নিশ্চিত করুন</p>
              </div>
              <div className="step">
                <span className="step-number">৩</span>
                <p>সন্দেহ হলে সরাসরি প্রার্থীর অফিসে যোগাযোগ করুন</p>
              </div>
            </div>
          </div>

          <div className="notice-card fraud-warning">
            <h3>প্রতারণা রিপোর্ট করুন</h3>
            <p>
              কেউ যদি এস এম জাহাঙ্গীর হোসেনের নামে অননুমোদিত কাজ করে বা প্রতারণার 
              চেষ্টা করে, অনুগ্রহ করে অবিলম্বে রিপোর্ট করুন:
            </p>
            <div className="report-contacts">
              <p><strong>হটলাইন:</strong> ০১৭১২-৩৪৫৬৭৮</p>
              <p><strong>ইমেইল:</strong> report@smjahangir.com</p>
            </div>
          </div>
        </section>

        {/* Update Notice */}
        <section className="update-notice">
          <p>
            <strong>সর্বশেষ আপডেট:</strong> {new Date().toLocaleDateString('bn-BD')}
          </p>
          <p className="update-text">
            এই তালিকা নিয়মিত আপডেট করা হয়। নতুন সদস্য যুক্ত হলে বা পরিবর্তন হলে 
            এখানে প্রকাশ করা হবে।
          </p>
        </section>
      </div>
    </div>
  );
};

export default TeamPanel;
