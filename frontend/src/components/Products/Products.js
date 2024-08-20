import React, { useState, useEffect, useContext } from "react";
import ProductsCss from "./Products.module.css";
import Header from "../Header";
import { Context } from "../../Store";
import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
export default function Products() {
  const { search } = useContext(Context);
  const [showData, setShowData] = useState({
    result: false,
  });
  const [sideNavData, setSideData] = useState([]);
  const [result, setResults] = useState(["asdasd", "asdds"]);
  const { category } = useParams();
  useEffect(() => {
    categoryfunc();
  }, []);

  async function categoryfunc() {
    let data = await fetch(`http://localhost:4000/products/${category}`);
    data = await data.json();
    if (data.status == "success") {
      setSideData(data.data);
      if (data.data.length > 0) {
        Products(data.data[0].subcategory).then((result) => {
          if (result.status == "success") {
            setResults(result.data);
            setShowData((prev) => {
              return { ...prev, result: true };
            });
          }
        });
      }
    } else {
      setSideData([]);
    }
  }

  async function Products(subcategory = "") {
    let result = await fetch(
      `http://localhost:4000/products/${category}?subcategory=${subcategory}`
    );
    result = await result.json();
    return result;
  }

  //   async function handleData(event,item){
  //     let image = event.target.files[0];
  //     const formData = new FormData();
  //     formData.append("heading", item.heading)
  //     formData.append("category", item.category)
  //     formData.append("subcategory" , item.subcategory)
  //     formData.append("imgData" , image)

  //     let response = await fetch('http://localhost:4000/products/drinks' , {
  //         method : "POST",
  //         body : formData,
  //     })
  //     response = await response.json();
  //     console.log(response, 'response')
  //   }

  console.log(result, "result");

  return (
    <Box>
      <Header />
      <Box className={ProductsCss.mainBox}>
        <Box className={ProductsCss.parentBox}>
          <Box className={ProductsCss.sideNav}>
            {sideNavData.map((item, index) => {
              return (
                <Box key={index}>
                  <Box
                    className={ProductsCss.webpImgs}
                    sx={{
                      backgroundImage: `url(${
                        "http://localhost:4000/Category/" + item.imgData
                      })`,
                    }}
                  ></Box>
                  <Box>{item.heading}</Box>
                </Box>
              );
            })}
          </Box>
          <Box className={ProductsCss.results}>
            {showData.result &&
              result.map((item, index) => {
                return (
                  <Box className={ProductsCss.resultsCards} key={index}>
                    <Box
                      className={ProductsCss.imgs}
                      sx={{
                        backgroundImage: `url(${
                          "http://localhost:4000/SubCategory/" + item.imgData
                        })`,
                      }}
                    ></Box>
                    <Box className={ProductsCss.resultBoxHeading}>
                      {item.heading}
                    </Box>
                    <Box className={ProductsCss.quantity}>{item.quantity}</Box>
                    <Box
                      sx={{
                        display:'flex',
                        alignItems:"center",
                        width: "140px",
                        justifyContent :"space-between",
                      }}
                    >
                      <Box className={ProductsCss.price}>{item.price + " rs"}</Box>
                      <Button variant='outlined' sx={{padding:'2px'}}>Add</Button>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
