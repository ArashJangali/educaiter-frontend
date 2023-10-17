import React, { useState } from "react";
import axios from "../Api/axiosInstance";
import Footer from "../Footer/Footer";
import "./Contact.css";

export default function Contact() {
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post("/contact", {
        description: description,
        subject: subject,
        email: email,
      });

      if (response.status === 200) {
        setShowVerificationModal(true);
      }
    } catch (error) {
      setShowModal(true);
      setError(error.response.data.error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleVerificationModalClose = () => {
    setEmail('')
    setSubject('')
    setDescription('')
    setShowVerificationModal(false);
  };

  const handleCloseModal = async () => {
    setEmail('')
    setSubject('')
    setDescription('')
    setShowModal(false);
  };

  console.log(email)
  
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Submit a request</h1>
      </div>

      <div className="contact-body">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="input-group">
            <label htmlFor="email">Your email address *</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="subject">Subject *</label>
            <input
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
              type="text"
              id="subject"
              placeholder="Enter the subject"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description *</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              placeholder="Enter the details of your request."
              required
            ></textarea>
          </div>

          <button className="contact-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

      {showVerificationModal && (
        <div className="modal">
          <div className="modal-content">
            <p>
              Thank you for reaching out! Your message has been successfully
              submitted.
            </p>
            <button onClick={handleVerificationModalClose}>Close</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{error}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
