import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { typeAPI } from '../../services/apiService';
import '../HomePage/HomePage.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    fieldType: '',
    fieldName: '',
    priceRange: ''
  });

  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    phone: '',
    email: ''
  });

  const [types, setTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(false);

  // Fetch types from API when component mounts
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoadingTypes(true);
        const response = await typeAPI.getTypes();
        const typesData = response.data?.result || response.data || [];
        setTypes(typesData);
      } catch (error) {
        console.error('Error fetching types:', error);
        // Fallback to empty array if API fails
        setTypes([]);
      } finally {
        setLoadingTypes(false);
      }
    };

    fetchTypes();
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value
    });
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Build query string
    const params = new URLSearchParams();
    if (searchData.fieldType) params.append('type', searchData.fieldType);
    if (searchData.fieldName) params.append('search', searchData.fieldName);
    if (searchData.priceRange) params.append('price', searchData.priceRange);
    
    // Navigate to stadium list page with filters
    navigate(`/danh-sach-san?${params.toString()}`);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    console.log('Dữ liệu đăng ký:', registrationData);
    // Gọi API đăng ký tại đây
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section" style={{ backgroundImage: "url('/football-field-background.jpg')" }}>
        <div className="container">
          <h1 className="hero-title">HỆ THỐNG HỖ TRỢ TÌM KIẾM SÂN BÀI NHANH</h1>
          <p className="hero-subtitle">Do đội ngũ Mi247.com phát triển nhằm giúp cho người dùng tìm được sân một cách nhanh nhất</p>
          
          {/* Search Form */}
          <div className="search-form">
            <form onSubmit={handleSearch}>
              <div className="search-row">
                <div className="search-field">
                  <select 
                    name="fieldType" 
                    value={searchData.fieldType}
                    onChange={handleSearchChange}
                    className="form-control"
                    disabled={loadingTypes}
                  >
                    <option value="">
                      {loadingTypes ? 'Đang tải...' : 'Loại/Theo loại sân'}
                    </option>
                    {types.map((type) => (
                      <option key={type.typeId} value={type.typeId}>
                        {type.typeName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="search-field">
                  <input 
                    type="text" 
                    name="fieldName" 
                    value={searchData.fieldName}
                    onChange={handleSearchChange}
                    placeholder="Nhập tên sân hoặc địa chỉ" 
                    className="form-control" 
                  />
                </div>
                <div className="search-field">
                  <select
                    name="priceRange" 
                    value={searchData.priceRange}
                    onChange={handleSearchChange}
                    className="form-control"
                  >
                    <option value="">Chọn khoảng giá</option>
                    <option value="0-200000">Dưới 200,000 VNĐ</option>
                    <option value="200000-500000">200,000 - 500,000 VNĐ</option>
                    <option value="500000-1000000">500,000 - 1,000,000 VNĐ</option>
                    <option value="1000000-2000000">1,000,000 - 2,000,000 VNĐ</option>
                    <option value="2000000-999999999">Trên 2,000,000 VNĐ</option>
                  </select>
                </div>
                <button type="submit" className="search-button">
                  <i className="fas fa-search"></i> Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                {/* Chú thích: Thêm SVG icon sân bóng đá ở đây */}
                <svg viewBox="0 0 50 50" className="icon">
                  <rect x="5" y="5" width="40" height="40" stroke="#000" strokeWidth="2" fill="none" />
                  <line x1="25" y1="5" x2="25" y2="45" stroke="#000" strokeWidth="2" />
                  <circle cx="25" cy="25" r="5" stroke="#000" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h3>Tìm kiếm vị trí sân</h3>
              <p>Dữ liệu sân đầu đôi, đầy đủ, liên tục cập nhật, giúp bạn dễ dàng tìm kiếm theo khu vực mong muốn</p>
            </div>
            <div className="feature-divider"></div>
            <div className="feature-item">
              <div className="feature-icon">
                {/* Chú thích: Thêm SVG icon lịch ở đây */}
                <svg viewBox="0 0 50 50" className="icon">
                  <rect x="5" y="5" width="40" height="40" stroke="#000" strokeWidth="2" fill="none" />
                  <line x1="5" y1="15" x2="45" y2="15" stroke="#000" strokeWidth="2" />
                  <circle cx="15" cy="25" r="3" fill="#000" />
                  <circle cx="25" cy="25" r="3" fill="#000" />
                  <circle cx="35" cy="25" r="3" fill="#000" />
                  <circle cx="15" cy="35" r="3" fill="#000" />
                  <circle cx="25" cy="35" r="3" fill="#000" />
                </svg>
              </div>
              <h3>Đặt lịch online</h3>
              <p>Không cần đến trực tiếp, không cần gọi điện đặt lịch, bạn hoàn toàn có thể đặt sân ở bất kì đâu có internet</p>
            </div>
            <div className="feature-divider"></div>
            <div className="feature-item">
              <div className="feature-icon">
                {/* Chú thích: Thêm SVG icon cầu thủ ở đây */}
                <svg viewBox="0 0 50 50" className="icon">
                  <circle cx="25" cy="10" r="6" stroke="#000" strokeWidth="2" fill="none" />
                  <line x1="25" y1="16" x2="25" y2="35" stroke="#000" strokeWidth="2" />
                  <line x1="15" y1="25" x2="35" y2="25" stroke="#000" strokeWidth="2" />
                  <line x1="25" y1="35" x2="15" y2="45" stroke="#000" strokeWidth="2" />
                  <line x1="25" y1="35" x2="35" y2="45" stroke="#000" strokeWidth="2" />
                </svg>
              </div>
              <h3>Tìm đội, bắt cặp đấu</h3>
              <p>Tìm kiếm, giao lưu các đội đá banh thể thao, kết nối, xây dựng cộng đồng thể thao sôi nổi, mạnh mẽ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Section */}
      <div className="registration-section">
        <div className="container">
          <div className="registration-content">
            <div className="registration-text">
              <h3>Bạn muốn đăng ký sử dụng phần mềm quản lý sân MI24/7 MIỄN PHÍ?</h3>
            </div>
            <div className="registration-form">
              <form onSubmit={handleRegistration}>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="fullName" 
                    value={registrationData.fullName}
                    onChange={handleRegistrationChange}
                    placeholder="Họ & tên *" 
                    required 
                    className="form-control" 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="tel" 
                    name="phone" 
                    value={registrationData.phone}
                    onChange={handleRegistrationChange}
                    placeholder="Số điện thoại *" 
                    required 
                    className="form-control" 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email" 
                    value={registrationData.email}
                    onChange={handleRegistrationChange}
                    placeholder="Email" 
                    className="form-control" 
                  />
                </div>
                <button type="submit" className="registration-button">Gửi</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;