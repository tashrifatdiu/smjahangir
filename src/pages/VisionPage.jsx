import './VisionPage.css';

const VisionPage = () => {
  return (
    <div className="vision-page">
      <div className="container">
        <h1>ভবিষ্যতের জন্য আমাদের দৃষ্টিভঙ্গি</h1>

        <div className="vision-stats">
          <div className="vision-stat-item">
            <span className="vision-stat-number">৫০ লক্ষ+</span>
            <span className="vision-stat-label">সমর্থক</span>
          </div>
          <div className="vision-stat-item">
            <span className="vision-stat-number">৫০+</span>
            <span className="vision-stat-label">এলাকা</span>
          </div>
          <div className="vision-stat-item">
            <span className="vision-stat-number">১০০+</span>
            <span className="vision-stat-label">উদ্যোগ</span>
          </div>
          <div className="vision-stat-item">
            <span className="vision-stat-number">১</span>
            <span className="vision-stat-label">একক দৃষ্টিভঙ্গি</span>
          </div>
        </div>
        
        <section className="vision-intro">
          <p>
            আমরা এমন একটি সম্প্রদায়ের স্বপ্ন দেখি যেখানে প্রতিটি মানুষের উন্নতির সুযোগ রয়েছে,
            যেখানে উদ্ভাবন এবং সহানুভূতি একসাথে মিলিত হয়, এবং যেখানে টেকসই উন্নয়ন সবার জন্য 
            সুবিধা নিয়ে আসে।
          </p>
        </section>

        <section className="goals">
          <h2>প্রধান লক্ষ্যসমূহ</h2>
          
          <div className="goal-item">
            <h3>১. শিক্ষার উৎকর্ষতা</h3>
            <p>
              সরকারি স্কুলগুলির জন্য অর্থায়ন বৃদ্ধি, শ্রেণির আকার হ্রাস, এবং দরিদ্র 
              পরিবারের শিক্ষার্থীদের জন্য বিনামূল্যে শিক্ষার ব্যবস্থা করা।
            </p>
          </div>

          <div className="goal-item">
            <h3>২. সর্বজনীন স্বাস্থ্যসেবা</h3>
            <p>
              প্রতিটি এলাকায় কমিউনিটি স্বাস্থ্য কেন্দ্র স্থাপন, স্বাস্থ্যসেবা সম্প্রসারণ,
              এবং ওষুধের দাম কমানোর জন্য আলোচনা করা।
            </p>
          </div>

          <div className="goal-item">
            <h3>৩. অর্থনৈতিক সুযোগ</h3>
            <p>
              অবকাঠামো বিনিয়োগের মাধ্যমে নতুন কর্মসংস্থান সৃষ্টি, ক্ষুদ্র ব্যবসায়ীদের 
              সহায়তা প্রদান, এবং ন্যায্য মজুরি নিশ্চিত করা।
            </p>
          </div>

          <div className="goal-item">
            <h3>৪. পরিবেশ সংরক্ষণ</h3>
            <p>
              পরিবেশ বান্ধব উন্নয়ন, নবায়নযোগ্য শক্তিতে বিনিয়োগ, এবং ভবিষ্যৎ প্রজন্মের 
              জন্য প্রাকৃতিক সম্পদ রক্ষা করা।
            </p>
          </div>

          <div className="goal-item">
            <h3>৫. সাশ্রয়ী আবাসন</h3>
            <p>
              সাশ্রয়ী মূল্যের আবাসন ইউনিট নির্মাণ, ভাড়া নিয়ন্ত্রণ ব্যবস্থা বাস্তবায়ন,
              এবং প্রথমবার বাড়ি ক্রেতাদের সহায়তা প্রদান।
            </p>
          </div>
        </section>

        <section className="future-plans">
          <h2>দীর্ঘমেয়াদী পরিকল্পনা</h2>
          <ul>
            <li>গণপরিবহন অবকাঠামো আধুনিকীকরণ</li>
            <li>গ্রামীণ এলাকায় ব্রডব্যান্ড ইন্টারনেট সম্প্রসারণ</li>
            <li>ন্যায়বিচার ব্যবস্থার সংস্কার এবং পুনর্বাসনে মনোনিবেশ</li>
            <li>যুব সমাজের জন্য ব্যাপক সেবা এবং সুবিধা প্রদান</li>
            <li>মানসিক স্বাস্থ্য সেবা এবং চিকিৎসায় বিনিয়োগ</li>
          </ul>
        </section>

        <section className="vision-gallery">
          <h2>কর্মে আমাদের দৃষ্টিভঙ্গি</h2>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop" alt="Education" />
              <div className="gallery-overlay">
                <h3>শিক্ষা</h3>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop" alt="স্বাস্থ্যসেবা" />
              <div className="gallery-overlay">
                <h3>স্বাস্থ্যসেবা</h3>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop" alt="অর্থনীতি" />
              <div className="gallery-overlay">
                <h3>অর্থনীতি</h3>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=400&fit=crop" alt="পরিবেশ" />
              <div className="gallery-overlay">
                <h3>পরিবেশ</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VisionPage;
