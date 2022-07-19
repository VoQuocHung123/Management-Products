/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import productApi from '../../api/productApi';
import './style.css';
import InputSlideImage from '../../components/InputSlideImage/InputSlideImage';

export default function UpdateProductManage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [previewTitleImage, setPreviewTitleImage] = useState();
  const [isUpdate, setIsUpdate] = useState(true);
  const [dataUpdateProduct, setDataUpdateProduct] = useState({});
  const [listFileImg, setListFileImg] = useState(location.state.slideimg.length === 0 ? {
    newImg1: '',
    newImg2: '',
    newImg3: '',
    newImg4: '',
  } : location.state.slideimg.reduce((acc, value, index) => ({ ...acc, [`newImg${index + 1}`]: value }), {}));
  const [previewSlideImage, setPreviewSlideImage] = useState(
    (() => {
      let a = location.state.slideimg.map((img) => (img === '' ? '' : `http://localhost:5000/${img}`));
      return location.state.slideimg.length === 0 ? ['', '', '', ''] : a;
    })(),
  );
  useEffect(() => {
    const getCategory = async () => {
      const response = await productApi.getCategory();
      setCategoryList(response.data);
    };
    getCategory();
  }, []);
  useEffect(() => {
    setDataUpdateProduct(location.state);
  }, [location.state]);
  const handleSlideImage = (e, index) => {
    const file = e.target.files[0];
    const newImageSlideFile = { ...listFileImg, [`newImg${index + 1}`]: file };
    setListFileImg(newImageSlideFile);
    const newArrSlidePreview = [...previewSlideImage];
    newArrSlidePreview[index] = URL.createObjectURL(file);
    setPreviewSlideImage(newArrSlidePreview);
    const convertArr = Object.values(newImageSlideFile);
    setDataUpdateProduct({ ...dataUpdateProduct, slideimg: convertArr });
  };
  const handleDeleteImageSlide = (indexDelete) => {
    const newImageSlideFile = { ...listFileImg, [`newImg${indexDelete + 1}`]: '' };
    setListFileImg(newImageSlideFile);
    const newArrImage = [...previewSlideImage];
    newArrImage[indexDelete] = '';
    setPreviewSlideImage(newArrImage);
    const convertArr = Object.values(newImageSlideFile);
    setDataUpdateProduct({ ...dataUpdateProduct, slideimg: convertArr });
  };
  const handleImageTitle = (e) => {
    const file = e.target.files[0];
    setPreviewTitleImage(URL.createObjectURL(file));
    setDataUpdateProduct({ ...dataUpdateProduct, image: file });
  };
  const handleDataForm = (dataProduct) => {
    setDataUpdateProduct(dataProduct);
  };
  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(dataUpdateProduct);
    for (let name in dataUpdateProduct) {
      if (name === 'slideimg') {
        formData.append(name, JSON.stringify(dataUpdateProduct[name]));
      } else {
        formData.append(name, dataUpdateProduct[name]);
      }
    }
    for (let name in listFileImg) {
      formData.append(name, listFileImg[name]);
    }
    // eslint-disable-next-line no-underscore-dangle
    const newProduct = await productApi.putProduct(dataUpdateProduct._id, formData);
    console.log(newProduct.data);
    navigate(`/chi-tiet-sp/${newProduct.data._id}`, { state: newProduct.data });
  };
  return (
    <div className="product-container">
      <div className="product-content update" style={{ marginTop: 80, padding: 30 }}>
        <div className="form-update" style={{ marginRight: 30 }}>
          <h3>Thông tin sản phẩm </h3>
          <Form
            categoryList={categoryList}
            isUpdate={isUpdate}
            dataUpdateProduct={dataUpdateProduct}
            handleDataForm={handleDataForm}
            updateProduct={updateProduct}
          />
        </div>
        <div className="update-image">
          <div className="update-image-title">
            <label
              htmlFor="img"
              style={{ color: '#6ECB63', cursor: 'pointer', display: 'block' }}
            >
              Ảnh minh hoạ <span style={{ color: 'red' }}> * </span>
            </label>
            <input type="file" id="img" style={{ display: 'none' }} onChange={handleImageTitle} />
            <img
              // eslint-disable-next-line no-unneeded-ternary
              src={previewTitleImage ? previewTitleImage : `http://localhost:5000/${location.state.image}`}
              alt=""
              width={300}
            />
          </div>
          <label
            htmlFor="img"
            style={{ color: '#6ECB63', cursor: 'pointer', display: 'block' }}
          >
            Ảnh Slide <span style={{ color: 'red' }}> * </span>
          </label>
          <div className="update-slide-image" style={{ marginLeft: -55 }}>
            {previewSlideImage.map((item, index) => {
              return (
                <InputSlideImage item={item} index={index} handleDeleteImageSlide={handleDeleteImageSlide} handleSlideImage={handleSlideImage} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
