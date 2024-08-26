import React, { useEffect, useState,useContext } from "react";
import { Box, Button } from "@mui/material";
import ProductsCss from "./GlobalProducts.module.css";
import Header from "../Header";
import { Context } from "../../Store";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Cart from "../Cart/Cart";



export default function GlobalProducts(){
  const { search } = useContext(Context);
  const [result, setResults] = useState([]);
  const [showData, setShowData] = useState({
    result: false,
  });
  const [gotoCart, setGotoCart] = useState(false);

  useEffect(() => {
      setResults([])
    if(search){
        searchProduct();
    }
}, [search]);
    async function searchProduct(){
        let response = await fetch(`http://localhost:4000/searchProduct?search=${search}`);
        response = await response.json();
        console.log(response);
        if(response.status == "success"){
            let res = response.result;
            setResults(res);
            setShowData((prev) => {
                return { ...prev, result: true };
              });
        }else{
            setResults([]);
            setShowData((prev) => {
                return { ...prev, result: false };
              });
        }
      }

      function handleCount(item, calc = "") {
        for(let val of result){
          if (val._id == item._id) {
            if (calc == "substract") {
              updateProduct(item , -1);
            } else {
              updateProduct(item , 1);
            }
          }
        }
  }

  
  async function updateProduct(item , opt){
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
    if(response.status == "success"){
        searchProduct();
    }
  }

    return <Box>
        <Header/>
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
                              handleCount(item , "");
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
                            handleCount(item,"");
                          }}
                        >
                          Add
                        </Button>
                      )}
                    </Box>
                  </Box>
                );
              })
              }
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
            searchProduct();
          }}
        />
      )}
    </Box>
}