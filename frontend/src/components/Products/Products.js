import React, { useState, useEffect, useContext } from "react";
import ProductsCss from "./Products.module.css";
import Header from "../Header";
import { Context } from "../../Store";
import { Box, Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Cart from "../Cart/Cart";

export default function Products() {
  const { search } = useContext(Context);
  const [showData, setShowData] = useState({
    result: false,
  });
  const [sideNavData, setSideData] = useState([]);
  const [result, setResults] = useState([]);
  const { category } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [gotoCart, setGotoCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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
            let res = result.data.map((item) => {
              return item;
            });
            setResults(res);
            setActiveIndex(0)
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

  function handleItems(item, index) {
    if(activeIndex != index){
      setActiveIndex(index);
    }
    Products(item.subcategory).then((result) => {
      if (result.status == "success") {
        let res = result.data.map((item) => {
          return { ...item};
        });
        setResults(res);
        setShowData((prev) => {
          return { ...prev, result: true };
        });
      }
    });
  }

  function handleCount(item, calc = "" , index) {
        for(let val of result){
          if (val._id == item._id) {
            if (calc == "substract") {
              updateProduct(item , -1 , index);
            } else {
              updateProduct(item , 1 , index);
            }
          }
        }
  }

  async function updateProduct(item , opt , index = activeIndex){
    console.log(opt,'ttt')
    let response = await fetch(`http://localhost:4000/updateProduct/${item._id}`, {
      method : "PUT",
      body:JSON.stringify({
        opt : opt
      }),
      headers:{
        "Content-Type" : "application/json",
      }
    })
    response = await response.json();
    handleItems(item , index)

    console.log(response,'function')
  }

  return (
    <Box>
      <Header />
      <Box
        className={ProductsCss.mainBox}
        sx={{ filter: gotoCart && "blur(5px)" }}
      >
        <Box className={ProductsCss.parentBox}>
          <Box className={ProductsCss.sideNav}>
            {sideNavData.map((item, index) => {
              return (
                <Box
                  key={index}
                  className={ProductsCss.sideLink}
                  onClick={() => {
                    handleItems(item, index);
                  }}
                  sx={{
                    borderLeft: `10px solid ${
                      activeIndex == index ? "#fadc8c" : "transparent"
                    }`,
                    backgroundColor: activeIndex == index && "#F5F5DC",
                  }}
                >
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
                        display: "flex",
                        alignItems: "center",
                        width: "140px",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box className={ProductsCss.price}>
                        {item.price + " rs"}
                      </Box>
                      {item?.count > 0 ? (
                        <Box
                          sx={{
                            width: "63px",
                            height: "29px",
                            background: "#A2D240",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-around",
                            color: "white",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "16px",
                          }}
                        >
                          <Box
                            onClick={() => {
                              handleCount(item, "substract" , activeIndex);
                            }}
                          >
                            -
                          </Box>
                          <Box>{item.count}</Box>
                          <Box
                            onClick={() => {
                              handleCount(item , "" , activeIndex);
                            }}
                          >
                            +
                          </Box>
                        </Box>
                      ) : (
                        <Button
                          variant="outlined"
                          color="success"
                          sx={{ padding: "2px" }}
                          onClick={() => {
                            handleCount(item,"" , activeIndex);
                          }}
                        >
                          Add
                        </Button>
                      )}
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "130px",
          textAlign: "center",
          alignContent: "center",
          height: "40px",
          background: "#A2D240",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "16px",
          position: "fixed",
          bottom: "30px",
          right: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
        onClick={() => {
          let items = result.filter((item) => item.count > 0);
          setCartItems(items);
          setGotoCart(true);
        }}
      >
        <ShoppingCartCheckoutIcon />
        <span>Go to Cart</span>
      </Box>
      {gotoCart && (
        <Cart
          onClose={() => {
            setGotoCart(false);
            categoryfunc();
          }}
        />
      )}
    </Box>
  );
}


