import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "45px",
          fontFamily: "Montserrat",
          marginBottom: "40px",
        }}
      >
        Product List
      </h1>

      <Swiper
        modules={[Navigation, Scrollbar]}
        navigation
        spaceBetween={20}
        scrollbar={{ draggable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        style={{
          paddingBottom: "40px",
        }}
      >
        {products.map((product, idx) => (
          <SwiperSlide key={idx}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
