import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import banner1 from "../../assets/afr2.jpg";
import banner2 from "../../assets/afr2.jpg";
import banner3 from "../../assets/afr3.jpg";
import banner4 from "../../assets/afr4.png";
import banner5 from "../../assets/afr5.avif";
import banner6 from "../../assets/afr6.avif";
import banner7 from "../../assets/afr8.avif";

const slides = [
  {
    title: "Heritage Beyond Words",
    description:
      "More Than Words, It’s Heritage: African Stories Crafted to Empower and Unite",
    image: banner1,
  },
  {
    title: "A Journey Through Time",
    description:
      "A journey through Africa's rich history and ancient civilizations.",
    image: banner2,
  },
  {
    title: "The Heartbeat of African Culture",
    description:
      "Stories from the Soul of Africa—Here to Inspire, Here to Connect.",
    image: banner3,
  },
  {
    title: "Africa: Past, Present, and Future",
    description:
      "Explore the Roots of Our Past, the Strength of Our Present, the Hope for Our Future.",
    image: banner4,
  },
  {
    title: "Africa's Global Impact",
    description: "Showcasing Africa’s contributions to the global economy.",
    image: banner5,
  },
  {
    title: "Wild Beauty and Conservation",
    description: "Celebrate the Spirit of Africa—One Story at a Time.",
    image: banner6,
  },
  {
    title: "Unity Through Diversity",
    description:
      "Uncover Voices of a Continent: Bold Narratives, Rich Histories, Endless Dreams.",
    image: banner7,
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="HeroSection">
      <div
        className="slide"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      >
        <div className="overlay"></div>
        <div className="content">
          <h1>{slides[currentSlide].title}</h1>
          <p>{slides[currentSlide].description}</p>
        </div>
      </div>

      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
