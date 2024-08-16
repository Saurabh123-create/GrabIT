import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Box, Button } from "@mui/material";
import HomePageCss from "./HomePage.module.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export default function HomePage() {
  const [imgData, setImageData] = useState(null);
  const [CardData, setCardData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/advertisementCards")
      .then((res) => res.json())
      .then((response) => {
        if (response.status == "success") {
          setCardData(response.data);
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

  function handleUpload(event, item){

  }

  // async function handleUpload(event, item) {
  //   let image = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append("header", item.header);
  //   formData.append("subtitle", item.subtitle);
  //   formData.append("img", image);

  //   let result = await fetch("http://localhost:4000/advertisementCards", {
  //     method: "post",
  //     body: formData,
  //   });
  //   result = await result.json();
  //   console.log(result);
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
                <Box className={HomePageCss.card} key={index} sx={{backgroundImage:
                  `url('http://localhost:4000/${item.img}')`,
                  }}>
                  {/* <Box>{item.header}</Box>
                  <Box>{item.subtitle}</Box>
                  <Box>
                    <button>Order</button>
                  </Box> */}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

{
  /* <Box><img src={"http://localhost:4000/" + item.img}/></Box> */
}
