import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState("yellow");

  const colorNames = {
    yellow: "Yellow Gold",
    white: "White Gold",
    rose: "Rose Gold",
  };

  const popularityOutOf5 =
    product.popularityScore5 || (product.popularityScore * 5).toFixed(1);

  const renderStars = (score, color = "#E6CA97") => {
    const fullStars = Math.floor(score);
    const halfStar = score - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < fullStars; i++)
      stars.push(<span key={"f" + i} style={{ color }}>&#9733;</span>);
    if (halfStar)
      stars.push(<span key="h" style={{ color }}>&#9733;</span>);
    for (let i = 0; i < emptyStars; i++)
      stars.push(<span key={"e" + i} style={{ color: "#ccc" }}>&#9733;</span>);

    return stars;
  };

  return (
    <div
      style={{
        padding: 40,
        borderRadius: 18,
        maxWidth: "300px",
        margin: "0 auto",
        alignContent: "space-between",
      }}
    >
      <Swiper modules={[Navigation]} navigation>
        <SwiperSlide>
          <img
            src={product.images[selectedColor]}
            alt={product.name}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "1 / 1",
              objectFit: "cover",
              borderRadius: 18,
            }}
          />
        </SwiperSlide>
      </Swiper>

      <h3
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontSize: "15px",
          marginTop: 12,
        }}
      >
        {product.name}
      </h3>

      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: "400",
          fontSize: "15px",
        }}
      >
        ${product.price} USD
      </p>

      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "left",
          gap: "10px",
        }}
      >
        {["yellow", "white", "rose"].map((color) => {
          let bgColor = color;
          if (color === "yellow") bgColor = "#E6CA97";
          if (color === "white") bgColor = "#D9D9D9";
          if (color === "rose") bgColor = "#E1A4A9";

          return (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              style={{
                background: bgColor,
                width: 24,
                height: 24,
                borderRadius: "50%",
                cursor: "pointer",
                border: selectedColor === color ? "2px solid #fff" : "none",
                boxShadow:
                  selectedColor === color
                    ? "0 0 0 1px #fff, 0 0 0 2px #000"
                    : "none",
              }}
            />
          );
        })}
      </div>

      <p
        style={{
          fontFamily: "Avenir",
          fontSize: "12px",
          marginTop: 10,
        }}
      >
        {colorNames[selectedColor]}
      </p>

      <p style={{ fontFamily: "Avenir", fontSize: "14px" }}>
        {renderStars(popularityOutOf5, "#E6CA97")} {popularityOutOf5} / 5
      </p>
    </div>
  );
}


