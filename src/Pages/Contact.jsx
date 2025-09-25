import React, { useState } from "react";
import Sidebar from "../hooks/cargallery/Sidebar";

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Prevent page reload
    console.log("Form Submitted:", { ...formData, problem: selectedProblem });
    alert("Message sent successfully!");
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setSelectedProblem("");
    setShowForm(false);
  };

  return (
    <>
    <Sidebar/>
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-24 px-6">
      {/* Heading */}
      <h1 className="text-5xl md:text-6xl pt-25 font-bold text-center mb-6 text-gray-800">
        How can we help you?
      </h1>
      <p className="text-gray-600 text-lg text-center max-w-2xl mb-12">
        Our team is here to assist you with any questions or issues related to Gallery. 
        Select a topic below to get started and send us a message.
      </p>

      {/* Clickable Box */}
      <div
        className="w-70 max-w-lg bg-black hover:bg-red-700  rounded-xl text-white py-6 px-8 text-center font-semibold shadow-lg transition"
        onClick={() => setShowForm(!showForm)}
      >
        General Help with Gallery
      </div>

      {/* Dropdown & Inputs */}
      {showForm && (
        <div className="w-full mb-10 max-w-2xl mt-6 bg-white/60 rounded-xl shadow-lg p-6 space-y-4 transition-all duration-300">
          <label className="block text-gray-700 font-medium mb-2">Select your problem:</label>
          <select
            className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={selectedProblem}
            onChange={(e) => setSelectedProblem(e.target.value)}
          >
            <option value="">-- Choose a Problem --</option>
            <option value="account">Account Issues</option>
            <option value="gallery">Gallery Upload Issue</option>
            <option value="payment">Payment Issue</option>
            <option value="other">Other</option>
          </select>

          {selectedProblem && (
            <form className="flex flex-col space-y-4 mt-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <button
                type="submit"
                className="w-50 bg-black hover:bg-red-900 text-white font-semibold py-3 rounded-sm transition"
              >
                Describe your problem 
              </button>
              <p>We will do our best to respond to you within 24 business hours.</p>
            </form>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default Contact;
