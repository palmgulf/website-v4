import React, { useState } from 'react';
import * as styles from './ProductGrid.module.css';
import ProductCard from './ProductCardGrid';
import StripeCheckout from './StripeCheckout';

const ProductGrid = () => {
  const [cart, setCart] = useState([]);

  const products = [
    { id: '1', name: 'Shirt', priceId: 'price_1SIuTXG4u1aY04NBtdmgaNGa' },
    { id: '2', name: 'Jacket', priceId: 'price_1SIuTwG4u1aY04NBrDQmKnoa' },
    { id: '3', name: 'Hat', priceId: 'price_1SIuUOG4u1aY04NB0fs4CNbO' },
    { id: '4', name: 'Shoes', priceId: 'price_1SIuUgG4u1aY04NBH7HSq9Lj' },
  ];

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.price === product.priceId);
      if (existingItem) {
        return prevCart.map(item =>
          item.price === product.priceId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { price: product.priceId, quantity: 1 }];
      }
    });
  };

  return (
    <div>
      <div className={styles.grid}>
        {products.map(product => (
          <div key={product.id} className={styles.card}>
            <ProductCard product={product} />
            <button
              className={styles.button}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      
      <div className={styles.cartSummary}>
        <h3>Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)</h3>
        <StripeCheckout
          lineItems={cart}
          onCheckoutStart={() => {
            const lineItems = cart.map(item => ({
              price: item.price,
              quantity: item.quantity
            }));
            console.log('Sending lineItems to checkout:', lineItems);
            console.log('Checkout started with cart items:', cart);
          }}
        />
      </div>
    </div>
  );
};

export default ProductGrid;