import React from "react";
import "./Cart.css";

// Child Component
const CartItem = ({ cart }) => {
  const audioRef = React.useRef(new Audio(cart.sound));

  const playSound = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const stopSound = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div
      className="cart-item"
      onMouseEnter={playSound}
      onMouseLeave={stopSound}
    >
      <div className="img-box">
        <img src={cart.image} alt={cart.name} className="cart-image" />
        <img src={cart.hoverImage} alt={cart.name} className="cart-image hover-img" />
      </div>
      <p className="car-name text-white">{cart.name}</p>
    </div>
  );
};

// Parent Component
const Cart = () => {
  const carts = [
    { image: "/images/lambo3.avif", hoverImage: "/images/lambo2.avif", name: "Lamborghini", sound: "/sounds/lambo.mp3" },
    { image: "/images/nissanlogo.avif", hoverImage: "/images/nissan1.avif", name: "Nissan GTR", sound: "/sounds/nissan.mp3" },
    { image: "/images/rolls2.avif", hoverImage: "/images/rolls1.avif", name: "Rolls Royce", sound: "/sounds/rolls.mp3" },
    { image: "/images/supra3.jpg", hoverImage: "/images/supra2.avif", name: "Supra MK4", sound: "/sounds/supra.mp3" },
    { image: "/images/dodgelogo.avif", hoverImage: "/images/viper1.avif", name: "Dodge Challenger", sound: "/sounds/dodge.mp3" },
    { image: "/images/vols2.avif", hoverImage: "/images/vols1.avif", name: "Mercedes", sound: "/sounds/mercedes.mp3" },
    { image: "/images/mustlogo.avif", hoverImage: "/images/must1.avif", name: "Mustang", sound: "/sounds/mustang.mp3" },
    { image: "/images/audilogo.avif", hoverImage: "/images/audi1.avif", name: "Audi", sound: "/sounds/audi.mp3" },
  ];

  return (
    <section className="cart-section">
      {/* Top Heading */}
      <h1 className="vertical-heading left bg-gradient-to-b from-gray-200 to-gray-500 bg-clip-text text-transparent">
        Top Brand Cars
      </h1>

      {/* Grid */}
      <div className="cart-grid">
        {carts.map((cart, i) => (
          <CartItem key={i} cart={cart} />
        ))}
      </div>

      {/* Bottom Heading */}
      <h1 className="vertical-heading right bg-gradient-to-b from-gray-200 to-gray-500 bg-clip-text text-transparent">
        Top Luxury Cars
      </h1>
    </section>
  );
};

export default Cart;
