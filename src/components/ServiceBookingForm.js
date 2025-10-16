import React, { useState } from 'react';
import * as styles from './ServiceBookingForm.module.css';

const ServiceBookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    serviceType: 'Consultation'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a server
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className={styles.input}
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className={styles.input}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <select
        name="serviceType"
        value={formData.serviceType}
        onChange={handleChange}
        className={styles.input}
      >
        <option value="Consultation">Consultation</option>
        <option value="Repair">Repair</option>
        <option value="Custom Order">Custom Order</option>
      </select>
      <button type="submit" className={styles.button}>
        Book Service
      </button>
    </form>
  );
};

export default ServiceBookingForm;