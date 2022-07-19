/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Carousel } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import productApi from '../../api/productApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import './style.css';

export default function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [listProductSuggest, setListProductSuggest] = useState([]);
  const getProductSuggest = async () => {
    try {
      const productSuggest = await productApi.getProductSuggest(
        location.state.category,
        location.state._id,
      );
      console.log(productSuggest);
      setListProductSuggest(productSuggest.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductSuggest();
  }, [location.state]);
  const handleShowDetail = (product) => {
    navigate(`/chi-tiet-sp/${product._id}`, { state: product });
  };
  const handleBack = () => {
    navigate(-1);
  };
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div className="product-container">
      <div className="product-content">
        <div className="btn-back" onClick={handleBack}>
          <FaArrowLeft />
          <span> Quay lại </span>
        </div>
        <div className="product-content-detail">
          <div className="product-detail-info">
            <tr><h3> {location.state.name} </h3></tr>
            <tr>
              <th className="category">Danh Mục:</th>
              <td>{location.state.category}</td>
            </tr>
            <tr>
              <th className="brand">Hãng Sản Xuất:</th>
              <td>{location.state.brand}</td>
            </tr>
            <tr>
              <th className="price">Giá Sản Phẩm:</th>
              <td>$ {location.state.price}</td>
            </tr>
            <div className="description" style={{ fontWeight: 'bold' }}> Mô Tả Sản Phẩm :</div>
            <div className="description-text" style={{ maxWidth: 300 }}>
              {' '}
              {location.state.description}{' '}
            </div>
          </div>
          <div className="product-detail-slideimg">
            <Carousel afterChange={onChange}>
              <div>
                <img
                  src={`http://localhost:5000/${location.state.image}`}
                  alt=""
                  style={{ backgroundColor: 'black', width: 350 }}
                />
              </div>
              {location.state.slideimg.map((item) => (
                item === '' ? '' : <div><img src={`http://localhost:5000/${item}`} style={{ backgroundColor: 'black', width: 350 }} alt="" /></div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="product-suggest">
          <h5 className="title-suggest"> Gợi Ý Cho Bạn: </h5>
          <div className="product-suggest-item">
            {listProductSuggest.map((product) => (
              <ProductCard
                product={product}
                handleShowDetail={handleShowDetail}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
