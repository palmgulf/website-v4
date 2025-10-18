import React from 'react';
import * as styles from './ProductCardGrid.module.css';
import ThemeLink from './ThemeLink';

const ProductCardGrid = ({ data = [], columns, spacing, showSlider }) => {
  // Fallback mock data if data is undefined
  const displayData = data.length > 0
    ? data
    : [
        { id: '1', name: "Shirt 1", price: 29.99, image: "/images/shirt1.jpg" },
        { id: '2', name: "Shirt 2", price: 34.99, image: "/images/shirt2.jpg" },
        { id: '3', name: "Shirt 3", price: 39.99, image: "/images/shirt3.jpg" }
      ];

  return (
    <div
      className={styles.grid}
      style={{
        gap: spacing ? '20px' : '0',
        gridTemplateColumns: `repeat(${columns || 3}, 1fr)`
      }}
    >
      {displayData.map((product) => (
        <div key={product.id} className={styles.card}>
          <div className={styles.imageContainer}>
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className={styles.image}
              />
            )}
          </div>
          <div className={styles.details}>
            <h3 className={styles.name}>{product.name}</h3>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
            <ThemeLink
              href={`/product/${product.id}`}
              className={styles.link}
            >
              View Details
            </ThemeLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardGrid;