import React, { useContext, useState } from "react";
import { Context } from "../../Store";
import PaytabCss from "./PayTab.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, MenuItem, Select, TextField } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BusinessIcon from "@mui/icons-material/Business";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import DoneIcon from "@mui/icons-material/Done";

export default function PayTab() {
  const {
    dialogStatus,
    toggleDialog,
    setAddress,
    Address,
    selectedAddress,
    totalCalc,
  } = useContext(Context);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentType, setType] = useState("");
  const [paymentValue, setPayValue] = useState("");
  const [paymentValueError, setPayValueError] = useState(false);
  const [verifyBtn, setVerifyBtn] = useState("Verify");
  const [finishPage, setFinishPage] = useState("Pay Now");

  const AddressTab = () => {
    return (
      <Box>
        <Box
          sx={{
            height: "100px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              transform: "scale(1.5)",
              display: "inline-block",
              padding: "10px",
              height: "37px",
              borderRadius: "50%",
              backgroundColor: "#c2c3ca",
            }}
          >
            <BusinessIcon fontSize="large" />
          </Box>
        </Box>
        <Box>
          <Box sx={{ fontSize: "14px" }} mt={1}>
            Saved Address
          </Box>
          <Box mt={1}>
            {Address.map((item) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    border: "2px solid #c4c4c4",
                    mb: 0.2,
                    background: selectedAddress.str == item.str && "#1aa108",
                    color: selectedAddress.str == item.str && "white",
                  }}
                  onClick={() => {
                    setAddress(item);
                  }}
                >
                  <Box sx={{ padding: "12px", alignContent: "center" }}>
                    {item.icon}
                  </Box>
                  <Box sx={{ wordBreak: "break-word", padding: "10px" }}>
                    <Box
                      sx={{
                        fontSize: "15px",
                        fontWeight: "600",
                        // color: "rgb(28, 28, 28)",
                        marginBottom: "2px",
                      }}
                    >
                      {item.type}
                    </Box>
                    <Box sx={{ fontSize: "12px" }}>{item.str}</Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  };

  const PaymentTab = () => {
    return (
      <Box>
        <Box
          sx={{
            height: "100px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              transform: "scale(1.5)",
              display: "inline-block",
              padding: "10px",
              height: "37px",
              borderRadius: "50%",
              backgroundColor: "#c2c3ca",
            }}
          >
            <PaymentIcon fontSize="large" />
          </Box>
        </Box>
        <Box sx={{ fontSize: "14px" }} mt={1}>
          Select Mode
        </Box>
        <Box mt={1}>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-simple-select-label"
            value={paymentType}
            onChange={(event) => {
              let val = event.target.value;
              setType(val);
            }}
          >
            <MenuItem value={"upi"}>UPI</MenuItem>
            <MenuItem value={"debit"}>Debit Card</MenuItem>
            <MenuItem value={"credit"}>Credit Card</MenuItem>
          </Select>
          <Box mt={1}>
            {paymentType == "upi" && (
              <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <TextField
                  error={paymentValueError}
                  size="small"
                  value={paymentValue}
                  placeholder="Enter upi id"
                  onChange={(e) => {
                    let str = e.target.value.trimStart();
                    if (str) {
                      setPayValueError(false);
                    }
                    setPayValue(str);
                  }}
                  // helperText={!paymentValue && "Incorrect entry."}
                />
                <Button
                  variant="contained"
                  size="meduim"
                  sx={{
                    background:
                      verifyBtn == "Verify"
                        ? "red"
                        : verifyBtn == "Loading..."
                        ? "gray"
                        : "green",
                  }}
                  onClick={() => {
                    if (!paymentValue) {
                      setPayValueError(true);
                      return;
                    }
                    setVerifyBtn("Loading...");
                    setTimeout(() => {
                      setVerifyBtn("Verified");
                    }, 2500);
                  }}
                >
                  {verifyBtn}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  };

  const FinishTab = () => {
    return (
      <Box>
        <Box
          sx={{
            height: "100px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              transform: "scale(1.5)",
              display: "inline-block",
              padding: "10px",
              height: "37px",
              borderRadius: "50%",
              backgroundColor: "#c2c3ca",
            }}
          >
            <LocalMallIcon fontSize="large" />
          </Box>
        </Box>
        <>
          <Box textAlign={"center"} mt={1}>
            {"Amount to be paid"}
          </Box>
          <Box textAlign={"center"} mt={1} fontSize={"34px"}>
            {"₹ " + totalCalc.total}
          </Box>
          <Box textAlign={"center"} mt={1}>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setFinishPage("Loading...");
                setTimeout(() => {
                  setFinishPage("Payment Done");
                  setActiveStep((prev) => {
                    return prev + 1;
                  });
                }, 2500);
              }}
            >
              {finishPage}
            </Button>
          </Box>
        </>
      </Box>
    );
  };

  const lastpage = () => {
    return (
      <Box>
        <Box
          sx={{
            height: "100px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              transform: "scale(1.5)",
              display: "inline-block",
              padding: "10px",
              height: "37px",
              borderRadius: "50%",
              backgroundColor: "green",
              color: "white",
            }}
          >
            <DoneIcon fontSize="large" />
          </Box>
        </Box>
        <Box textAlign={"center"} color={"green"} mt={1} fontSize={"20px"}>
          {"Amount done successfuly."}
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        background: "white",
        boxShadow: "0px 0px 30px rgba(0,0,0,0.5)",
        borderRadius: "8px",
        minWidth: "400px",
        height: "500px",
        position: "absolute",
        zIndex: "2",
        left: "50%",
        top: "100px",
        translate: "-50% 0px",
      }}
    >
      <Box
        sx={{ padding: "12px 12px", textAlign: "right" }}
        onClick={() => {
          toggleDialog("paytab", false);
        }}
      >
        <ClearIcon fontSize="small" />
      </Box>
      <Box sx={{ padding: "0px 12px" }}>
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>{"Address"}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{"Pay"}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{"Finish"}</StepLabel>
          </Step>
        </Stepper>
        <Box sx={{ display: "flex", flexDirection: "column", height: "410px" }}>
          <Box sx={{ flexGrow: "2", p: 1 }} width={"357px"}>
            {activeStep == 0 && AddressTab()}
            {activeStep == 1 && PaymentTab()}
            {activeStep == 2 && FinishTab()}
            {activeStep == 3 && lastpage()}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 10px",
            }}
          >
            <Button
              variant="contained"
              size="small"
              disabled={activeStep == 3 || activeStep == 0}
              onClick={() => {
                if (activeStep > 0) {
                  setActiveStep((prev) => {
                    return prev - 1;
                  });
                }
              }}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              size="small"
              disabled={activeStep == 3 || verifyBtn != "Verified"}
              onClick={() => {
                if (activeStep < 2) {
                  setActiveStep((prev) => {
                    return prev + 1;
                  });
                }
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
