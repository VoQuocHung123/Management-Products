/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './style.css';

export default function Form({
  categoryList,
  handleDataForm,
  addNewProduct,
  isUpdate,
  dataUpdateProduct,
}) {
  // eslint-disable-next-line object-curly-newline
  const { name, category, brand, description, price } = dataUpdateProduct || {};
  const [brandsList, setBrandsList] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [dataEditProduct, setDataEditProduct] = useState({});
  useEffect(() => {
    setDataEditProduct(dataUpdateProduct);
  }, [dataUpdateProduct]);

  const handleChangeValue = (e) => {
    const { id, value } = e.target;
    setDataEditProduct({ ...dataEditProduct, [id]: value });
    handleDataForm({ ...dataEditProduct, [id]: value });
  };
  const handleChangeCategory = (e) => {
    const data = categoryList.find((cate) => cate.name === e.target.value);
    setBrandsList(data.brands);
    handleChangeValue(e);
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setDataEditProduct({ ...dataEditProduct, image: file });
    handleDataForm({ ...dataEditProduct, image: file });
  };
  return (
    <div>
      <form>
        <div className="form-group" style={{ marginTop: 0 }}>
          <label htmlFor="name">Tên Sản Phẩm </label>
          <span style={{ color: 'red' }}> * </span>
          <input
            type="text"
            id="name"
            value={dataEditProduct?.name}
            className="form-input"
            placeholder="Nhập tên sản phẩm "
            onChange={handleChangeValue}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cate">Danh Mục Sản Phẩm </label>
          <span style={{ color: 'red' }}> * </span>
          <select
            id="category"
            className="form-input"
            onChange={handleChangeCategory}
          >
            <option value={dataUpdateProduct ? category : ''} hidden> {dataUpdateProduct ? category : 'Chọn danh mục sản phẩm'}</option>
            {categoryList.map((cate, index) => (
              <option value={cate.name} key={index}>{cate.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="brand">Hãng Sản Xuất </label>
          <span style={{ color: 'red' }}> * </span>
          <select
            id="brand"
            className="form-input"
            onChange={handleChangeValue}
          >
            <option value={dataUpdateProduct ? brand : ''} hidden>{dataUpdateProduct ? brand : 'Chọn hãng sản xuất '}</option>
            {brandsList.map((item, index) => (
              <option value={item} key={index}> {item} </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Giá </label>
          <span style={{ color: 'red' }}> * </span>
          <input
            type="text"
            id="price"
            value={dataEditProduct?.price}
            className="form-input"
            placeholder="Nhập giá sản phẩm "
            onChange={handleChangeValue}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Mô Tả</label>
          <span style={{ color: 'red' }}> * </span>
          <textarea
            id="description"
            cols="30"
            rows=""
            value={dataEditProduct?.description}
            className="form-input"
            style={{ height: 100 }}
            placeholder="Nhập mô tả"
            onChange={handleChangeValue}
          />
        </div>
        {isUpdate ? (
          ''
        ) : (
          <div className="form-group">
            <label
              htmlFor="img"
              style={{ color: '#6ECB63', cursor: 'pointer' }}
            >
              Thêm ảnh minh hoạ
            </label>
            <span style={{ color: 'red' }}> * </span>
            <input
              type="file"
              className="form-input"
              id="img"
              style={{ display: 'none' }}
              onChange={handleImage}
            />
          </div>
        )}
        <div className="preview-image">
          <img
            src={previewImage}
            alt=""
            width={100}
            style={{ marginBottom: 30 }}
          />
        </div>
        <div className="action-form">
          <Button className="btn-cancel-form" title="Huỷ" />
          <Button
            className="btn-add-form"
            title="Thêm"
            onClick={addNewProduct}
          />
        </div>
      </form>
    </div>
  );
}
