/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import queryString from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import SearchInput from '../../components/SearchInput/SearchInput';
import './style.css';
import Paginate from '../../components/Pagination/Pagination';
import productApi from '../../api/productApi';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';

export default function ProductManage() {
  const LIMIT = 6;
  const [dataProduct, setDataProduct] = useState([]);
  const [numOfPage, setNumOfPage] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [dataEditProduct, setDataEditProduct] = useState({});
  const [productId, setProductId] = useState();
  const navigate = useNavigate();
  const handlePageChange = async (newPage) => {
    setSearchParams({ limit: LIMIT, page: newPage });
  };
  async function getDataProduct() {
    try {
      const query = queryString.stringify(Object.fromEntries(searchParams));
      const reponsive = await productApi.getbyPage(query);
      setDataProduct(reponsive.data.products);
      const lengthPages = Math.ceil(reponsive.data.countProduct / LIMIT);
      const arrNumPage = [];
      for (let i = 1; i <= lengthPages; i++) {
        arrNumPage.push(i);
      }
      setNumOfPage(arrNumPage);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getDataProduct();
  }, [searchParams]);

  useEffect(() => {
    const getCategory = async () => {
      const response = await productApi.getCategory();
      setCategoryList(response.data);
    };
    getCategory();
  }, []);

  const handleSearchChange = (newSearch) => {
    console.log(newSearch);
    const a = Object.fromEntries(searchParams);
    console.log(a);
    if (newSearch.searchContent === '') {
      delete a.text;
      setSearchParams(a);
    } else {
      setSearchParams({
        fields: 'name',
        text: newSearch.searchContent,
      });
    }
  };
  const showModalAdd = () => {
    setShowModal(!showModal);
  };
  const handleCancelModal = () => {
    setShowModal(false);
  };
  const addNewProduct = async (values) => {
    try {
      const formData = new FormData();
      for (const name in values) {
        formData.append(name, values[name]);
      }
      await productApi.postProduct(formData);
      getDataProduct();
      setShowModal(!showModal);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDataForm = (newProduct) => {
    setDataEditProduct(newProduct);
  };
  const handleShowDelete = (product, e) => {
    e.stopPropagation();
    setProductId(product);
    setShowModalDelete(!showModalDelete);
  };
  const handleDelete = async () => {
    await productApi.deleteProduct(productId._id);
    getDataProduct();
    setShowModalDelete(!showModalDelete);
  };
  const handleUpdate = async (value, e) => {
    e.stopPropagation();
    navigate(`update-product/${value._id}`, { state: value });
  };
  const handleShowDetail = (product) => {
    navigate(`/chi-tiet-sp/${product._id}`, { state: product });
  };
  return (
    <>
      <div className="product-container">
        <div className="header-product-manage">
          <Button
            className="action-add"
            title="Thêm sản phẩm"
            onClick={showModalAdd}
          />
          <SearchInput onChange={handleSearchChange} />
        </div>
        <div className="product-content">
          <div className="product-item">
            {dataProduct.length === 0
              ? 'Không có sản phẩm'
              : dataProduct.map((product, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <ProductCard
                    key={index}
                    product={product}
                    isProductManage={true}
                    handleDelete={handleShowDelete}
                    handleUpdate={handleUpdate}
                    handleShowDetail={handleShowDetail}
                  />
                ))}
          </div>
          <Paginate numOfPage={numOfPage} onPageChange={handlePageChange} />
        </div>
      </div>
      {showModal && (
        <Modal
          title="Thêm Sản Phẩm"
          visible={showModal}
          onCancel={handleCancelModal}
        >
          <Form
            categoryList={categoryList}
            handleDataForm={handleDataForm}
            addNewProduct={addNewProduct}
          />
        </Modal>
      )}
      {showModalDelete && (
        <Modal
          visible={showModalDelete}
          onCancel={() => setShowModalDelete(!showModalDelete)}
        >
          <div className="delete-product-container">
            <div className="delete-content">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Delete-button.svg/862px-Delete-button.svg.png"
                alt=""
                width={70}
                className="img-delete"
              />
              <p>
                Bạn Có Chắc Muốn Xoá Sản Phẩm{' '}
                <span style={{ color: 'red' }}> {productId.name} </span>
              </p>
              <p>
                Sản phẩm sẽ bị{' '}
                <span style={{ color: 'red' }}>xoá vĩnh viễn</span>
              </p>
            </div>
            <div className="action-delete-form">
              <Button
                className="cancel-delete"
                title="Huỷ"
                onClick={() => setShowModalDelete(!showModalDelete)}
              />
              <Button
                className="confirm-delete"
                title="Xoá"
                onClick={() => handleDelete()}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
