import React from 'react';
import styles from './ProductGrid.module.css';
import products from '../../helpers/product.json';

const ProductGrid = () => {
  // Use first 4 products from product.json
  const displayedProducts = products.slice(0, 4);

  return (
    <div className={styles.grid}>
      {displayedProducts.map((product, index) => (
        <div key={index} className={styles.productCard}>
          <img 
            src={product.image} 
            alt={product.alt || product.name} 
            className={styles.productImage} 
          />
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;