import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { typeAPI } from '../../services/apiService';
import '../SearchModal/SearchModal.css';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchData, setSearchData] = useState({
    fieldType: '',
    fieldName: '',
    priceRange: ''
  });

  const [recentSearches, setRecentSearches] = useState([]);
  const [types, setTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // Fetch types from API
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

    if (isOpen) {
      fetchTypes();
    }
  }, [isOpen]);

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }

    // Add event listener to handle clicks outside the modal
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value
    });
  };

  const saveSearch = () => {
    // Get type name for display in recent searches
    const selectedTypeObj = types.find(type => type.typeId == searchData.fieldType);
    const typeName = selectedTypeObj ? selectedTypeObj.typeName : '';
    
    const searchTerm = `${typeName} ${searchData.fieldName} ${searchData.priceRange}`.trim();
    
    if (searchTerm.length > 0) {
      // Add to recent searches
      const newSearches = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
      setRecentSearches(newSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newSearches));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    saveSearch();
    
    // Build query string
    const params = new URLSearchParams();
    if (searchData.fieldType) params.append('type', searchData.fieldType);
    if (searchData.fieldName) params.append('search', searchData.fieldName);
    if (searchData.priceRange) params.append('price', searchData.priceRange);
    
    // Navigate to stadium list page with filters
    navigate(`/danh-sach-san?${params.toString()}`);
    onClose();
  };

  const handleRecentSearchClick = (search) => {
    // Parse the search term and set the form fields
    const parts = search.split(' ');
    if (parts.length > 0) {
      // Try to find the type by name
      const typeName = parts[0];
      const matchedType = types.find(type => 
        type.typeName.toLowerCase() === typeName.toLowerCase()
      );
      
      setSearchData({
        fieldType: matchedType ? matchedType.typeId : '',
        fieldName: parts.length > 1 ? parts[1] : '',
        priceRange: parts.length > 2 ? parts.slice(2).join(' ') : ''
      });
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay">
      <div className="search-modal" ref={modalRef}>
        <div className="search-modal-header">
          <h2>Tìm kiếm</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="search-modal-body">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-form-row">
              <div className="form-group">
                <select 
                  name="fieldType"
                  value={searchData.fieldType}
                  onChange={handleChange}
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
              
              <div className="form-group">
                <input
                  type="text"
                  name="fieldName"
                  placeholder="Nhập tên sân hoặc địa chỉ để tìm kiếm..."
                  value={searchData.fieldName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <select
                  name="priceRange"
                  placeholder="Chọn khoảng giá"
                  value={searchData.priceRange}
                  onChange={handleChange}
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
            </div>
            
            <button type="submit" className="search-button">
              <i className="fas fa-search"></i> Tìm kiếm
            </button>
          </form>

          {recentSearches.length > 0 && (
            <div className="recent-searches">
              <div className="recent-searches-header">
                <h3>Tìm kiếm gần đây</h3>
                <button className="clear-searches" onClick={clearRecentSearches}>
                  Xóa tất cả
                </button>
              </div>
              <ul className="recent-search-list">
                {recentSearches.map((search, index) => (
                  <li key={index} onClick={() => handleRecentSearchClick(search)}>
                    <i className="fas fa-history"></i>
                    <span>{search}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="popular-areas">
            <h3>Khoảng giá phổ biến</h3>
            <div className="area-tags">
              <div className="area-tag" onClick={() => setSearchData({...searchData, priceRange: '0-200000'})}>
                Dưới 200K
              </div>
              <div className="area-tag" onClick={() => setSearchData({...searchData, priceRange: '200000-500000'})}>
                200K - 500K
              </div>
              <div className="area-tag" onClick={() => setSearchData({...searchData, priceRange: '500000-1000000'})}>
                500K - 1M
              </div>
              <div className="area-tag" onClick={() => setSearchData({...searchData, priceRange: '1000000-2000000'})}>
                1M - 2M
              </div>
              <div className="area-tag" onClick={() => setSearchData({...searchData, priceRange: '2000000-999999999'})}>
                Trên 2M
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;