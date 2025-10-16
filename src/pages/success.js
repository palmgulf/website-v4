import React from 'react';
import * as styles from '../components/ProductGrid.module.css';

const SuccessPage = () => {
  return (
    <div className={styles.container}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
    </div>
  );
};

export default SuccessPage;