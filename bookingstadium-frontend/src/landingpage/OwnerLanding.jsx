import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './PolicylandingPages.css';

const OwnerLanding = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    stadiumName: '',
    location: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log('Owner registration:', formData);
    alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ trong thời gian sớm nhất.');
  };

  return (
    <div className="policy-page">
      <Navbar />
      
      <div className="page-header">
        <div className="container">
          <div className="header-content">
            <div className="star-icon">
              <i className="fas fa-futbol"></i>
            </div>
            <h1 className="page-title">Dành cho chủ sân thể thao</h1>
            <div className="title-underline"></div>
          </div>
        </div>
      </div>

      <div className="policy-content">
        <div className="container">
          {/* Hero Section */}
          <div className="policy-section">
            <div className="hero-content">
              <h2 className="policy-title">🏟️ Cách Mạng Hoá Quản Lý Sân với BookingStadium</h2>
              
              {/* Hero Image */}
              <div className="hero-image">
                <img src="football-field-background.jpg" alt="Quản lý sân bóng hiện đại" />
                <div className="hero-overlay">
                  <h3>Hệ thống quản lý sân thông minh</h3>
                </div>
              </div>
              
              <div className="pain-points">
                <h3>Bạn có gặp những khó khăn này?</h3>
                <div className="pain-point-list">
                  <div className="pain-point-item">
                    <i className="fas fa-phone-slash"></i>
                    <p>Bạn có thấy phiền khi liên tục nghe điện thoại hỏi sân giờ vàng dù đã kín?</p>
                  </div>
                  <div className="pain-point-item">
                    <i className="fas fa-chart-line"></i>
                    <p>Bạn có gặp khó khăn với thống kê doanh thu, chi phí vận hành sân?</p>
                  </div>
                  <div className="pain-point-item">
                    <i className="fas fa-cogs"></i>
                    <p>Bạn muốn số hóa và tự động hóa hoàn toàn việc quản lý sân và bán hàng?</p>
                  </div>
                </div>
                
                <div className="solution-statement">
                  <h3>🚀 Mi24/7 chính là Giải pháp bạn đang tìm!!!</h3>
                  <p>Hệ thống quản lý đặt sân thông minh, được thiết kế đặc biệt dành cho các chủ sân bãi thể thao tại Việt Nam.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Features */}
          <div className="policy-section">
            <h2 className="policy-title">🌟 5 Tính Năng Cốt Lõi</h2>
            
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-digital-tachograph"></i>
                </div>
                <h4>1. Số hóa Sân bãi toàn diện</h4>
                <ul className="policy-list">
                  <li>Dễ dàng tạo và quản lý thông tin sân</li>
                  <li>Hiển thị trực quan trạng thái Đặt / Trống, Thanh toán / Chưa thanh toán</li>
                  <li>Chia nhỏ các Slot linh hoạt theo khung 30 phút, 1 giờ, 1.5 giờ</li>
                  <li>Thiết lập mức giá cho từng khung giờ, thu phí trực tuyến</li>
                </ul>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-tasks"></i>
                </div>
                <h4>2. Vận hành hiệu quả, linh hoạt</h4>
                <ul className="policy-list">
                  <li>Dashboard trực quan, dễ dàng theo dõi tất cả booking theo ngày, tuần, tháng</li>
                  <li>Cập nhật real-time dữ liệu đặt sân từ website và mobile</li>
                  <li>Hệ thống tự động xác nhận và hủy booking</li>
                  <li>Bộ lọc đa dạng: Nhanh chóng tìm thấy thông tin bạn cần</li>
                </ul>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-chart-bar"></i>
                </div>
                <h4>3. Báo cáo tài chính chuyên sâu</h4>
                <ul className="policy-list">
                  <li>Theo dõi chi tiết và chính xác doanh thu từ các lượt đặt sân</li>
                  <li>Báo Cáo Tài Chính đầy đủ theo ngày, tuần, tháng, quý</li>
                  <li>Lịch Sử Giao Dịch: theo dõi tất cả các khoản thanh toán</li>
                  <li>Thống kê hiệu suất từng sân, khung giờ vàng</li>
                </ul>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-robot"></i>
                </div>
                <h4>4. Tự động hóa bán hàng 24/7</h4>
                <ul className="policy-list">
                  <li>Để khách hàng tự tìm và đặt các slot trống trực tiếp qua website</li>
                  <li>Tích hợp thanh toán MoMo an toàn và liền mạch</li>
                  <li>AI Chatbot hỗ trợ khách hàng 24/7</li>
                  <li>Giúp bạn bán hàng và kiếm doanh thu cả khi...đang ngủ!</li>
                </ul>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-star"></i>
                </div>
                <h4>5. Hệ thống đánh giá và phản hồi</h4>
                <ul className="policy-list">
                  <li>Khách hàng đánh giá sau mỗi lần sử dụng sân</li>
                  <li>Xây dựng uy tín và thương hiệu qua đánh giá tích cực</li>
                  <li>Theo dõi mức độ hài lòng của khách hàng</li>
                  <li>Cải thiện chất lượng dịch vụ dựa trên feedback</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mission & Benefits */}
          <div className="policy-section">
            <h2 className="policy-title">🎯 Sứ mệnh của Mi24/7</h2>
            <h3>Số hóa và chuyên nghiệp hóa Quản lý sân thể thao Việt Nam</h3>
            
            <div className="benefits-grid">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <h4>⏰ Tiết Kiệm Thời Gian</h4>
                <ul className="policy-list">
                  <li><strong>Quy Trình Tự Động:</strong> Tự động hoá các quy trình đặt sân và thanh toán</li>
                  <li><strong>Dashboard Trực Quan:</strong> Quản lý tình trạng sân một cách hiệu quả</li>
                  <li><strong>Thông báo tự động:</strong> Email xác nhận, nhắc nhở khách hàng</li>
                </ul>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-trending-up"></i>
                </div>
                <h4>📈 Nâng Cao Hiệu Quả Quản Lý</h4>
                <ul className="policy-list">
                  <li><strong>Quản Lý Dễ Dàng:</strong> Giao diện đơn giản, dễ sử dụng</li>
                  <li><strong>Tích Hợp Toàn Diện:</strong> Tất cả công cụ quản lý trong một hệ thống</li>
                  <li><strong>Báo cáo chi tiết:</strong> Phân tích doanh thu, xu hướng đặt sân</li>
                </ul>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-medal"></i>
                </div>
                <h4>🏆 Tăng Tính Chuyên Nghiệp</h4>
                <ul className="policy-list">
                  <li><strong>Trải Nghiệm Khách Hàng:</strong> Đặt sân và thanh toán trực tuyến mượt mà</li>
                  <li><strong>Thương hiệu mạnh:</strong> Website chuyên nghiệp, hệ thống đánh giá</li>
                  <li><strong>Dịch vụ 24/7:</strong> Khách hàng có thể đặt sân bất cứ lúc nào</li>
                </ul>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-money-bill-wave"></i>
                </div>
                <h4>💰 Tối ưu Doanh Thu</h4>
                <ul className="policy-list">
                  <li><strong>Tối Ưu Hoá Đặt Sân:</strong> Giảm thiểu các slot trống</li>
                  <li><strong>Thanh toán liền mạch:</strong> Tích hợp MoMo</li>
                  {/* <li><strong>Phân tích xu hướng:</strong> Tối ưu giá theo khung giờ vàng</li> */}
                </ul>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="policy-section">
            <h2 className="policy-title">🛠️ Công Nghệ Hiện Đại</h2>
            
            <div className="tech-features">
              <div className="tech-item">
                <i className="fas fa-shield-alt"></i>
                <h4>Bảo mật cao với Spring Security + JWT</h4>
              </div>
              <div className="tech-item">
                <i className="fas fa-database"></i>
                <h4>Database MySQL ổn định, hiệu suất cao</h4>
              </div>
              <div className="tech-item">
                <i className="fas fa-mobile-alt"></i>
                <h4>Responsive design, tương thích mọi thiết bị</h4>
              </div>
              <div className="tech-item">
                <i className="fas fa-brain"></i>
                <h4>AI Chatbot Gemini hỗ trợ khách hàng thông minh</h4>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="policy-section">
            <h2 className="policy-title">🚀 Bắt Đầu Ngay Hôm Nay!</h2>
            <p>Tham gia cùng số lượng ngày càng tăng của các chủ sân đã chuyển đổi số hoạt động kinh doanh với Mi247.</p>
            
            <div className="registration-form">
              <h3>Đăng ký trở thành đối tác chủ sân</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Họ & tên *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Số điện thoại *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Nhập email của bạn"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="stadiumName">Tên sân</label>
                    <input
                      type="text"
                      id="stadiumName"
                      name="stadiumName"
                      value={formData.stadiumName}
                      onChange={handleInputChange}
                      placeholder="Tên sân thể thao của bạn"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="location">Địa chỉ sân</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Địa chỉ chi tiết của sân"
                  />
                </div>
                
                <button type="submit" className="submit-btn">
                  <i className="fas fa-paper-plane"></i>
                  Đăng ký ngay
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="policy-section">
            <h2 className="policy-title">📞 Liên Hệ Với Chúng Tôi</h2>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>Email: support@mi247.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>Hotline: 1900 1234 (8:00 - 22:00)</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Địa chỉ: Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Other Policies */}
          <div className="other-policies">
            <h3>Tìm hiểu thêm về BookingStadium</h3>
            <div className="policy-links">
              <Link to="/huong-dan-su-dung" className="policy-link">
                <i className="fas fa-book"></i>
                <span>Hướng dẫn sử dụng</span>
              </Link>
              <Link to="/chinh-sach-khach-hang" className="policy-link">
                <i className="fas fa-users"></i>
                <span>Chính sách khách hàng</span>
              </Link>
              <Link to="/chinh-sach-thanh-toan" className="policy-link">
                <i className="fas fa-credit-card"></i>
                <span>Chính sách thanh toán</span>
              </Link>
              <Link to="/chinh-sach-bao-mat" className="policy-link">
                <i className="fas fa-shield-alt"></i>
                <span>Chính sách bảo mật</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OwnerLanding; 