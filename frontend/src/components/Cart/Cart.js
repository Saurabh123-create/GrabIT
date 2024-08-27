import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ProductsCss from "../Products/Products.module.css";

export default function Cart({ onClose }) {
  const [data, setData] = useState();
  const [totalCalc, setTotalCalc] = useState({
    subtotal: 0,
    total: 0,
    delivery: 0,
    handlingCost: 0,
  });
  useEffect(() => {
    getCartData();
  }, []);

  async function getCartData() {
    let response = await fetch("http://localhost:4000/getCartData");
    response = await response.json();
    if (response.status == "success") {
      if (response.data.length != 0) {
        setData(response.data);
        let total = 0;
        response.data.map((item) => {
          total = total + (item.price * item.count);
        });
        setTotalCalc((prev) => {
          return {
            ...prev,
            total: total + 12 + 4,
            subtotal: total,
            delivery: 12,
            handlingCost: 4,
          };
        });
      }
    }
  }

  async function updateProduct(item, opt) {
    let response = await fetch(
      `http://localhost:4000/updateProduct/${item._id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          opt: opt,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    if (response.status == "success") {
      getCartData();
    }
  }

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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={onClose}
      >
        <Box ml={2} fontWeight={700}>
          Add to Cart
        </Box>
        <ClearIcon />
      </Box>

      <Box sx={{ maxHeight: "60%", overflow: "auto" }}>
        {data?.map((item, index) => {
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
                {/* {item?.count > 0 ? ( */}
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
                      updateProduct(item, -1);
                    }}
                  >
                    -
                  </Box>
                  <Box>{item.count}</Box>
                  <Box
                    onClick={() => {
                      updateProduct(item, 1);
                    }}
                  >
                    +
                  </Box>
                </Box>
                {/* ) : (
                    <Button
                      variant="outlined"
                      color="success"
                      sx={{ padding: "2px" }}
                      onClick={() => {
                      }}
                    >
                      Add
                    </Button>
                  )} */}
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
            <Box textAlign={"right"}>₹ {totalCalc.subtotal}</Box>
          </Grid>
          <Grid item xs="6">
            <Box>Delivery charges</Box>
          </Grid>
          <Grid item xs="6">
            <Box textAlign={"right"}>₹ {totalCalc.delivery}</Box>
          </Grid>
          <Grid item xs="6">
            <Box>Handling charges</Box>
          </Grid>
          <Grid item xs="6">
            <Box textAlign={"right"}>₹ {totalCalc.handlingCost}</Box>
          </Grid>
          <Grid item xs="6">
            <Box sx={{ fontSize: "13px", fontWeight: "700" }}>Grand Total</Box>
          </Grid>
          <Grid item xs="6">
            <Box
              textAlign={"right"}
              sx={{ fontSize: "13px", fontWeight: "700" }}
            >
              ₹ {totalCalc.total}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: "80px", alignContent: "center", textAlign: "center" }}>
        <Box

          onClick={()=>{}}
          sx={{
            background: "green",
            color: "white",
            borderRadius: "10px",
            margin: "6px",
            padding: "13px 16px",
            fontSize: "15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Box sx={{ fontSize: "15px", fontWeight: "700" }}>
              ₹ {totalCalc.total}
            </Box>
            <Box sx={{ fontSize: "12px" }}>Total</Box>
          </Box>
          <Box sx={{ fontWeight: "700" }}>Proceed to Pay</Box>
        </Box>
      </Box>
    </Box>
  );
}
