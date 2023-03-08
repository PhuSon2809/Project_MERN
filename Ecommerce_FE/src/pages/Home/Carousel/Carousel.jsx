import { Typography } from "@mui/material";
import React from "react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { carouselData } from "../../../assets/data/CarouselData";
import { BoxContent, Content, Name } from "./CarouselStyle";

function Carousel() {
  return (
    <Swiper
      slidesPerView={"auto"}
      pagination={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
      style={{ marginTop: "30px", marginBottom: "30px", height: "540px" }}
    >
      {carouselData.map((item) => (
        <SwiperSlide key={item.id}>
          <img src={item.image} alt={item.name} />
          <BoxContent>
            <Name>- {item.name} -</Name>
            <Content>{item.content}</Content>
            <Content>{item.content_2}</Content>
          </BoxContent>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
