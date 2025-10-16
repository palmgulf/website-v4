import React, { useState } from 'react';
import styles from './ServiceBookingForm.module.css';

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
    // Here you would typically send the data to a backend
    alert('Form submitted successfully! Check console for details.');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
      </label>
      
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
      </label>
      
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
      </label>
      
      <label>
        Service Type:
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className={styles.selectField}
        >
          <option value="Consultation">Consultation</option>
          <option value="Repair">Repair</option>
          <option value="Custom Order">Custom Order</option>
        </select>
      </label>
      
      <button type="submit" className={styles.submitButton}>
        Book Service
      </button>
    </form>
  );
};

export default ServiceBookingForm;