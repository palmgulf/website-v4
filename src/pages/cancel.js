import React from 'react';
import Layout from '../components/LayoutOption';

const CancelPage = () => (
  <Layout>
    <div className="container">
      <h1>Payment Canceled</h1>
      <p>Your payment was canceled. You can return to the cart to try again.</p>
    </div>
  </Layout>
);

export default CancelPage;