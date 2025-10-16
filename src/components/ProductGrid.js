import React, { useState } from 'react';
import * as styles from './ProductGrid.module.css';
import productData from '../helpers/product.json';
import StripeCheckout from './StripeCheckout';

// Default price IDs for products (using user's test price ID)
const defaultPriceIds = [
  'price_1SIkg8G4u1aY04NBWhUrT8ox',
  'price_1SIkg8G4u1aY04NBWhUrT8ox',
  'price_1SIkg8G4u1aY04NBWhUrT8ox',
  'price_1SIkg8G4u1aY04NBWhUrT8ox'
];

const ProductGrid = () => {
  // Add priceIds to products if missing
  const products = productData.length > 0 ?
    productData.slice(0, 4).map((product, index) => ({
      ...product,
      priceId: product.priceId || defaultPriceIds[index] || `price_${index + 1}`
    })) :
    [
      {name: "Shirt", price: 29.99, image: "/images/shirt.jpg", priceId: 'price_12345'},
      {name: "Jacket", price: 59.99, image: "/images/jacket.jpg", priceId: 'price_23456'},
      {name: "Hat", price: 19.99, image: "/images/hat.jpg", priceId: 'price_34567'},
      {name: "Shoes", price: 79.99, image: "/images/shoes.jpg", priceId: 'price_45678'}
    ];

  // Ensure all products have valid price IDs
  products.forEach(product => {
    if (!product.priceId || typeof product.priceId !== 'string' || !product.priceId.startsWith('price_')) {
      console.warn(`Invalid priceId for product: ${product.name}`, product);
      product.priceId = 'price_default';
    }
  });

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, {
      price: product.priceId,
      quantity: 1
    }]);
  };

  return (
    <div>
      <div className={styles.grid}>
        {products.map((product, index) => (
          <div key={index} className={styles.card}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: 'auto' }} 
            />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button 
              className={styles.button} 
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {cartItems.length > 0 && (
        <div className={styles.checkoutContainer}>
          <StripeCheckout lineItems={cartItems} />
        </div>
      )}
    </div>
  );
};

export default ProductGrid;