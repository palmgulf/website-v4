import React from 'react';
import * as styles from '../components/ProductGrid.module.css';

const CancelPage = () => {
  return (
    <div className={styles.container}>
      <h1>Payment Canceled</h1>
      <p>Your payment was not completed.</p>
    </div>
  );
};

export default CancelPage;