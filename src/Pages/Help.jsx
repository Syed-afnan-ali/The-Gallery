import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../hooks/cargallery/Sidebar";

const HelpCenter = () => {
  const [openTopic, setOpenTopic] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

   const helpTopics = [
    {
      id: 1,
      title: "Account Issues",
      description: "Problems related to login, registration, and account settings.",
      questions: [
        { q: "How do I reset my password?", a: "Click on 'Forgot Password' on login page and follow instructions." },
        { q: "Can I change my email?", a: "Yes, go to account settings and update your email address." },
        { q: "How do I delete my account?", a: "Contact support from the contact page and request deletion." },
        { q: "How do I update my profile picture?", a: "Go to profile settings and upload a new picture." },
      ],
    },
    {
      id: 2,
      title: "Gallery Upload Issues",
      description: "Common questions about uploading images or videos to the gallery.",
      questions: [
        { q: "What formats are supported?", a: "We support JPG, PNG, and MP4 formats." },
        { q: "Max file size?", a: "Files up to 10MB are allowed for images and 50MB for videos." },
        { q: "Why is my upload failing?", a: "Check your internet connection and file format." },
        { q: "Can I upload multiple files?", a: "Yes, you can select multiple images or videos." },
      ],
    },
    {
      id: 3,
      title: "Payment & Subscription",
      description: "Questions regarding payments, subscriptions, and billing.",
      questions: [
        { q: "Which payment methods are accepted?", a: "We accept credit cards, debit cards, and PayPal." },
        { q: "Can I cancel my subscription?", a: "Yes, go to subscription settings and cancel anytime." },
        { q: "Refund policy?", a: "Refunds are processed within 5–7 business days after approval." },
        { q: "Can I upgrade my plan?", a: "Yes, you can upgrade your plan from account settings." },
      ],
    },
    {
      id: 4,
      title: "Technical Support",
      description: "Issues with website functionality or technical problems.",
      questions: [
        { q: "Website not loading?", a: "Clear cache and try again or check your internet connection." },
        { q: "Error while viewing gallery?", a: "Try refreshing or using a different browser." },
        { q: "App crashes frequently?", a: "Update the app to the latest version." },
        { q: "How to report a bug?", a: "Use the contact page to submit a bug report." },
      ],
    },
    {
      id: 5,
      title: "Privacy & Security",
      description: "Questions about data protection and account security.",
      questions: [
        { q: "Is my data safe?", a: "Yes, we follow strict security protocols." },
        { q: "How do I enable 2FA?", a: "Go to security settings and activate two-factor authentication." },
        { q: "Can others see my uploads?", a: "You can control visibility in gallery settings." },
        { q: "How to report suspicious activity?", a: "Contact support immediately with details." },
      ],
    },
    {
      id: 6,
      title: "Community Guidelines",
      description: "Rules and policies for posting content and interacting with the community.",
      questions: [
        { q: "What content is allowed?", a: "Only car-related and original content is allowed." },
        { q: "Can I delete my post?", a: "Yes, you can remove it from your profile." },
        { q: "Reporting inappropriate content?", a: "Use the report button on the specific post." },
        { q: "Can I comment anonymously?", a: "No, comments are always linked to your account." },
      ],
    },
    {
      id: 7,
      title: "Mobile App",
      description: "Questions about the Gallery mobile application.",
      questions: [
        { q: "Is there an iOS app?", a: "Yes, available on the App Store." },
        { q: "Is there an Android app?", a: "Yes, available on Google Play Store." },
        { q: "App not updating?", a: "Try reinstalling or checking for updates manually." },
        { q: "Notifications not working?", a: "Check your device settings and app permissions." },
      ],
    },
    {
      id: 8,
      title: "Feature Requests",
      description: "Submit ideas or suggestions to improve Gallery.",
      questions: [
        { q: "Can I request a new feature?", a: "Yes, use the contact page to submit ideas." },
        { q: "How long until features are implemented?", a: "Implementation time depends on complexity." },
        { q: "Can I vote on features?", a: "Currently, voting is not available but will be in future updates." },
        { q: "Who decides feature priority?", a: "Our development team evaluates requests based on impact." },
      ],
    },
    {
      id: 9,
      title: "Content Removal",
      description: "How to remove your posts or report content removal.",
      questions: [
        { q: "How to delete my image?", a: "Go to your gallery, select the image, and click delete." },
        { q: "Can I remove someone else's post?", a: "No, you can only report it for review." },
        { q: "How long does removal take?", a: "Reviews are processed within 24–48 hours." },
        { q: "Why was my content removed?", a: "Content violating guidelines may be removed automatically." },
      ],
    },
    {
      id: 10,
      title: "Other Issues",
      description: "Miscellaneous questions not covered above.",
      questions: [
        { q: "Who do I contact for general inquiries?", a: "Use the contact page to send a message to support." },
        { q: "Can I suggest improvements?", a: "Yes, suggestions are always welcome." },
        { q: "How do I report bugs?", a: "Use the contact form or email support." },
        { q: "Other technical problems?", a: "Contact support with detailed description." },
      ],
    },
  ];


  const handleTopicClick = (id) => {
    setOpenTopic(openTopic === id ? null : id);
    setOpenQuestion(null); // reset question when new topic opens
  };

  const handleQuestionClick = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <>
    <Sidebar/>
    <div className="w-full min-h-screen bg-gray-50 py-16 px-6 space-y-6">
      <h1 className="text-6xl pt-25 font-bold text-center mb-4 text-gray-800">
        Need Assistance?
      </h1>
      <p className="text-gray-600 text-center text-lg max-w-3xl mx-auto mb-12">
        Select a topic below to see common questions and answers. Click on a card to expand.
      </p>

      <div className="space-y-6 max-w-5xl mx-auto">
        {helpTopics.map((topic) => (
          <div
            key={topic.id}
            className="w-full  text-black rounded-xl shadow-xl  overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            {/* Topic Card */}
            <div
              className="p-6 text-xl font-semibold flex justify-between items-center"
              onClick={() => handleTopicClick(topic.id)}
            >
              <span>{topic.title}</span>
              <span className="text-2xl">{openTopic === topic.id ? "−" : "+"}</span>
            </div>

            {/* Smooth Dropdown Questions */}
            <div
              className={`bg-white text-gray-800 overflow-hidden transition-all duration-500 ${
                openTopic === topic.id ? "max-h-[1000px] p-6 space-y-4" : "max-h-0 p-0"
              }`}
            >
              <p className="mb-4 text-gray-700 font-medium">{topic.description}</p>
              {topic.questions.map((q, index) => (
                <div key={index} className="border-b border-gray-200 pb-2">
                  <div
                    className="font-medium  flex justify-between items-center hover:text-red-600 transition-colors duration-300"
                    onClick={() => handleQuestionClick(index)}
                  >
                    <span>{q.q}</span>
                    <span>{openQuestion === index ? "−" : "+"}</span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openQuestion === index ? "max-h-40 mt-2" : "max-h-0 mt-0"
                    }`}
                  >
                    <p className="text-gray-700">{q.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default HelpCenter;
