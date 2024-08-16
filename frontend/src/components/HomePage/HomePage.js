import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Box, Button, Input } from "@mui/material";
import HomePageCss from "./HomePage.module.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [CardData, setCardData] = useState([]);
  const [variety, setVariety] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:4000/advertisementCards")
      .then((res) => res.json())
      .then((response) => {
        if (response.status == "success") {
          setCardData(response.data);
        }
      });
    fetch("http://localhost:4000/variety")
      .then((res) => res.json())
      .then((response) => {
        if (response.status == "success") {
          setVariety(response.data);
        }
      });
  }, []);

  function handleNext(event) {
    let Box = document.querySelector(".cardBox1");
    let width = Box.clientWidth;
    Box.scrollLeft = Box.scrollLeft - width;
  }

  function handlePrev(event) {
    let Box = document.querySelector(".cardBox1");
    let width = Box.clientWidth;
    Box.scrollLeft = Box.scrollLeft + width;
  }

  // async function handleUpload(event, item , index) {
  //   let image = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append("heading", item.heading);
  //   formData.append("category", item.category);
  //   formData.append("imgData", image);

  //   let result = await fetch("http://localhost:4000/variety", {
  //     method: "post",
  //     body: formData,
  //   });
  //   result = await result.json();
  //   console.log(result);
  //   return;

  //   // let result = await fetch("http://localhost:4000/advertisementCards", {
  //   //   method: "post",
  //   //   body: formData,
  //   // });
  // }

  return (
    <Box>
      <Header />
      <Box className={HomePageCss.mainBox}>
        <Box className={HomePageCss.cardboxMain}>
          <Box
            className={HomePageCss.next}
            onClick={handleNext}
            sx={{ left: "10px" }}
          >
            <NavigateBeforeIcon />
          </Box>
          <Box
            className={HomePageCss.prev}
            onClick={handlePrev}
            sx={{ right: "10px" }}
          >
            <NavigateNextIcon />
          </Box>
          <Box className={HomePageCss.cardbox + " cardBox1"}>
            {CardData.map((item, index) => {
              return (
                <Box
                  className={HomePageCss.card}
                  key={index}
                  sx={{
                    backgroundImage: `url('http://localhost:4000/${item.img}')`,
                  }}
                ></Box>
              );
            })}
          </Box>
        </Box>

        <Box className={HomePageCss.variety}>
          {variety.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  backgroundImage: `url("http://localhost:4000/${item.imgData}")`,
                  transition: "all 200ms ease",
                  "&:hover": {
                    transform: "scale(1.09)",
                  },
                }}
                onClick={(e)=>{navigate(`/products/${item.category}`)}}
              ></Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
