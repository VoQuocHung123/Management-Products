/* eslint-disable react/jsx-boolean-value */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import SearchInput from '../../components/SearchInput/SearchInput';
import './style.css';
import Paginate from '../../components/Pagination/Pagination';
import productApi from '../../api/productApi';

export default function Product() {
  const LIMIT = 6;
  const [dataProduct, setDataProduct] = useState([]);
  const [numOfPage, setNumOfPage] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePageChange = async (newPage) => {
    setSearchParams({ limit: LIMIT, page: newPage });
  };
  async function getDataProduct() {
    try {
      const query = queryString.stringify(Object.fromEntries(searchParams));
      console.log(query);
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
  return (
    <div className="product-container">
      <div className="header-product">
        <SearchInput onChange={handleSearchChange} />
      </div>
      <div className="product-content">
        <div className="product-item">
          {dataProduct.length === 0
            ? 'Không có sản phẩm'
            : dataProduct.map((product, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <ProductCard key={index} product={product} />
              ))}
        </div>
        <Paginate numOfPage={numOfPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
