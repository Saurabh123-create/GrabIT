import React, { useState, useEffect, useContext } from "react";
import ProductsCss from "./Products.module.css";
import Header from "../Header";
import { Context } from "../../Store";
import { Box, Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ClearIcon from "@mui/icons-material/Clear";

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
    console.log(item, "result");
    setActiveIndex(index);
    Products(item.subcategory).then((result) => {
      if (result.status == "success") {
        let res = result.data.map((item) => {
          return { ...item, count: 0 };
        });
        setResults(res);
        setShowData((prev) => {
          return { ...prev, result: true };
        });
      }
    });
  }

  function handleCount(item, calc = "") {
    setResults((prev) => {
      let newData = prev.map((val) => {
        if (val._id == item._id) {
          if (calc == "substract") {
            return { ...val, count: val.count - 1 };
          } else {
            return { ...val, count: val.count + 1 };
          }
        } else {
          return val;
        }
      });
      return newData;
    });
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
                              handleCount(item, "substract");
                            }}
                          >
                            -
                          </Box>
                          <Box>{item.count}</Box>
                          <Box
                            onClick={() => {
                              handleCount(item);
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
                            handleCount(item);
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
        <SidePanel
          onClose={() => {
            setGotoCart(false);
          }}
          selectedItems={result}
          handleCount={handleCount}
        />
      )}
    </Box>
  );
}

function SidePanel({ onClose, selectedItems, handleCount }) {
  return (
    <Box
      sx={{
        width: "380px",
        height: "100%",
        position: "absolute",
        background: "white",
        top: "0px",
        right: "0px",
        zIndex: "5",
        boxShadow: "-2px 0px 18px gray",
        transition: "1s ease",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: "40px",
          textAlign: "right",
          alignContent: "center",
          paddingRight: "10px",
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center'
        }}
        onClick={onClose}
      >
        <Box ml={2} fontWeight={700}>Add to Cart</Box>
        <ClearIcon />
      </Box>

<Box sx={{maxHeight:'60%', overflow:"auto"}}>
      {selectedItems
        .filter((item) => item.count > 0)
        .map((item, index) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "0px 10px",
                justifyContent: "space-around",
                height: "100px",
              }}
              key={index}
            >
              <Box
                className={ProductsCss.cartimgs}
                sx={{
                  backgroundImage: `url(${
                    "http://localhost:4000/SubCategory/" + item.imgData
                  })`,
                }}
              ></Box>
              <Box className={ProductsCss.cardBoxHeading}>
                {item.heading}
                <Box className={ProductsCss.quantity}>{item.quantity}</Box>
                <Box className={ProductsCss.price}>{item.price + " rs"}</Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "140px",
                  justifyContent: "center",
                  textAlign: "right",
                }}
              >
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
                        handleCount(item, "substract");
                      }}
                    >
                      -
                    </Box>
                    <Box>{item.count}</Box>
                    <Box
                      onClick={() => {
                        handleCount(item);
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
                      handleCount(item);
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

      <Box
        sx={{
          height: "120px",
          borderTop: "1px solid gray",
          marginTop: "auto",
          padding: "10px",
        }}
      >
        <Box sx={{ fontSize: "15px", fontWeight: "700" }}>Billing Details</Box>
        <Grid
          container
          mt={1}
          spacing={0.4}
          sx={{ fontSize: "12px", fontWeight: "500" }}
        >
          <Grid item xs="6">
            <Box>Sub Total</Box>
          </Grid>
          <Grid item xs="6">
            <Box textAlign={"right"}>₹ 126</Box>
          </Grid>
          <Grid item xs="6">
            <Box>Delivery charges</Box>
          </Grid>
          <Grid item xs="6">
            <Box textAlign={"right"}>₹ 12</Box>
          </Grid>
          <Grid item xs="6">
            <Box>Handling charges</Box>
          </Grid>
          <Grid item xs="6">
            <Box textAlign={"right"}>₹ 4</Box>
          </Grid>
          <Grid item xs="6">
            <Box sx={{ fontSize: "13px", fontWeight: "700" }}>Grand Total</Box>
          </Grid>
          <Grid item xs="6">
            <Box
              textAlign={"right"}
              sx={{ fontSize: "13px", fontWeight: "700" }}
            >
              ₹ 246
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: "80px", alignContent: "center", textAlign: "center" }}>
        <Box
          sx={{
            background: "green",
            color: "white",
            borderRadius: "10px",
            margin: "6px",
            padding: "13px 16px",
            fontSize: "15px",
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
          }}
        >
          <Box>
            <Box sx={{fontSize:'15px' , fontWeight:'700'}}>₹ 246</Box>
            <Box sx={{fontSize:'12px'}}>Total</Box>
          </Box>
          <Box sx={{fontWeight:'700'}}>Proceed to Pay</Box>
        </Box>
      </Box>
    </Box>
  );
}
