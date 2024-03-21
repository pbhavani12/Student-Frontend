import React from "react";
import "./Contact.css"; // Import the CSS file

const Contact = () => {
  return (
    <div className="contact-container" align="center">
      <h2>Contact Us</h2>
      <p>If you have any questions or inquiries, please feel free to reach out to us:</p>
      <ul>
        <li>Email: <a href="mailto:University@example.com">University@example.com</a></li>
        <li>Phone: +1 (123) 456-7890</li>
        {/* You can add more contact information as needed */}
      </ul>
    </div>
  );
};

export default Contact;
