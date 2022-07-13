/* eslint-disable react/prop-types */
import React from 'react';
import { Pagination } from '@mui/material';
import './style.css';

export default function Paginate({ numOfPage, onPageChange }) {
  return (
    <div className="pagination-container">
      <Pagination
        count={numOfPage.length}
        variant="outlined"
        color="primary"
        shape="rounded"
        onChange={(e, value) => onPageChange(value)}
      />
    </div>
  );
}
