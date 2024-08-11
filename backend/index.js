require("./DB/config");
const users = require("./DB/users");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const privateKey = "29042000";

app.use(express.json());
app.use(cors());
app.post("/login", async (req, res) => {
  try {
    let result = await users.findOne(req.body).select("-password");
    if (result) {
      jwt.sign({ result }, privateKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send(
            JSON.stringify({
              message: err,
              status: "failed",
            })
          );
        } else {
          res.send(
            JSON.stringify({
              data: result,
              auth: token,
              status: "success",
            })
          );
        }
      });
    } else {
      res.send(
        JSON.stringify({
          message: "No result found",
          status: "failed",
        })
      );
    }
  } catch (err) {
    res.send(
      JSON.stringify({
        message: err,
        status: "failed",
      })
    );
  }
});

app.post("/signup", async (req, res) => {
  try {
    if (Object.keys(req.body).length == 0) {
      throw "Empty Payload Provided";
    }
    let result = new users(req.body);
    await result.save();
    result = result.toObject();
    delete result.password;
    if (result) {
      jwt.sign({ result }, privateKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send(
            JSON.stringify({
              message: err,
              status: "failed",
            })
          );
        } else {
          res.send(
            JSON.stringify({
              data: result,
              status: "success",
              auth: token,
            })
          );
        }
      });
    } else {
      res.send(
        JSON.stringify({
          message: "Error Ocurred",
          status: "failed",
        })
      );
    }
  } catch (err) {
    res.send(
      JSON.stringify({
        message: err,
        status: "failed",
      })
    );
  }
});

app.listen(4000);
