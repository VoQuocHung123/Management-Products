/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Form from '../../components/Form/Form';
import productApi from '../../api/productApi';
import './style.css';
import Button from '../../components/Button/Button';

export default function UpdateProductManage() {
  const [categoryList, setCategoryList] = useState([]);
  const arrSlideImage = ['', '', '', ''];
  const [previewSlideImage, setPreviewSlideImage] = useState(arrSlideImage);
  const [previewTitleImage, setPreviewTitleImage] = useState();
  const [isUpdate, setIsUpdate] = useState(true);
  const [dataUpdateProduct, setDataUpdateProduct] = useState({});
  const location = useLocation();
  console.log(dataUpdateProduct);
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
    const newArrSlide = [...previewSlideImage];
    newArrSlide[index] = URL.createObjectURL(file);
    setPreviewSlideImage(newArrSlide);
    setDataUpdateProduct({ ...dataUpdateProduct, slideimg: newArrSlide });
  };
  const handleDeleteImageSlide = (indexDelete) => {
    const newArrImage = [...previewSlideImage];
    newArrImage[indexDelete] = '';
    setPreviewSlideImage(newArrImage);
    setDataUpdateProduct({ ...dataUpdateProduct, slideimg: newArrImage });
  };
  const handleImageTitle = (e) => {
    const file = e.target.files[0];
    setPreviewTitleImage(URL.createObjectURL(file));
    setDataUpdateProduct({ ...dataUpdateProduct, image: file });
  };
  const handleDataForm = (dataProduct) => {
    setDataUpdateProduct(dataProduct);
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
              // src={location.state.image ? `http://localhost:5000/${location.state.image}` : previewTitleImage}
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
                // eslint-disable-next-line react/no-array-index-key
                <div className="group-content-image" key={index}>
                  <label style={{ display: 'block' }}> Ảnh {index + 1}</label>
                  <input
                    type="file"
                    id={`img-slide-${index}`}
                    className="slide-image-item"
                    onChange={(event) => handleSlideImage(event, index)}
                  />
                  {item ? (
                    <>
                      <div className="image-item-container">
                        <img src={item} alt="" className="img-slide-select" />
                        <div className="action-slide-image">
                          <Button
                            className="btn-update-slideimg"
                            title="Cập Nhật"
                            onClick={() => document.querySelector(`#img-slide-${index}`).click()}
                          />
                          <Button className="btn-delete-slideimg" title="Xoá" onClick={() => handleDeleteImageSlide(index)} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <label htmlFor={`img-slide-${index}`}>
                      <div className="img-slide-select">
                        <FaPlus />
                      </div>
                    </label>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
