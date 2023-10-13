import React from 'react';
import Footer from '../Footer/Footer';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Submit a request</h1>
      </div>

      <div className="contact-body">
        <form>
          <div className="input-group">
            <label htmlFor="email">Your email address *</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label htmlFor="subject">Subject *</label>
            <input type="text" id="subject" placeholder="Enter the subject" required />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description *</label>
            <textarea id="description" placeholder="Enter the details of your request. A member of our support staff will respond as soon as possible." required></textarea>
          </div>

          <button className='contact-btn' type="submit">Submit</button>
        </form>
        
      </div>
      <Footer />
    </div>
  );
}
