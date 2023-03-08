import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { Box, Container, Grid } from "@mui/material";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { categoryData } from "../../assets/data/CategoryData";
import { fetureProduct } from "../../assets/data/FetureProduct";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import FetureProduct from "../../components/FetureProduct/FetureProduct";
import ProductItem from "../../components/ProductItem/ProductItem";
import Carousel from "./Carousel/Carousel";
import {
  BoxPr,
  BoxProduct,
  BoxUser,
  ContentUser,
  DateTime,
  NameUser,
  Title
} from "./HomeStyle";

function Home() {
  return (
    <Container>
      <Carousel />
      <Grid container sx={{ mb: 4 }}>
        <Grid item md={3}>
          <BoxPr>
            <img
              src="https://cdn.shopify.com/s/files/1/0549/6851/6852/files/Banner.jpg?v=1647230535"
              alt="PR"
            />

            <Title>CUSTOMER LOVE</Title>

            <BoxUser>
              <img
                alt="user"
                src="https://cdn.shopify.com/s/files/1/0549/6851/6852/files/3_75x75_crop_center.jpg?v=1632567537"
                width="100px"
                height="100px"
                style={{ borderRadius: "99px" }}
              />

              <NameUser>Tony Stark</NameUser>
              <Box sx={{ color: "#ffd90c" }}>
                <StarIcon fontSize="small" />
                <StarIcon fontSize="small" />
                <StarIcon fontSize="small" />
                <StarIcon fontSize="small" />
                <StarIcon fontSize="small" />
              </Box>
              <ContentUser>
                Make a type specimen book. It has survived not only five leap,
                but also the centuries into elt was make a. Make a type specimen
                book.
              </ContentUser>
              <DateTime>Sept 15, 2022</DateTime>
            </BoxUser>

            <img
              src="https://cdn.shopify.com/s/files/1/0549/6851/6852/files/Banner-1.jpg?v=1647230535"
              alt="PR"
            />
            <Title>FEATURE PRODUCTS</Title>
            <BoxProduct>
              {fetureProduct.map((item) => (
                <FetureProduct key={item.id} product={item} />
              ))}
            </BoxProduct>
          </BoxPr>
        </Grid>
        <Grid item md={9} sx={{ pl: 3 }}>
          <Box>
            <Title>SHOP CATEGORIES</Title>
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper"
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                height: "200px",
              }}
            >
              {categoryData.map((category) => (
                <SwiperSlide key={category.id}>
                  <CategoryItem category={category} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
          <Box>
            <Title>OWN PRODUCTS</Title>
            <Grid container>
              <Grid item md={4}>
                <ProductItem />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
