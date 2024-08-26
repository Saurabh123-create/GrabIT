require("./DB/config");
const users = require("./DB/users");
const advertisementCards = require("./DB/advertisementCards");
const variety = require("./DB/variety");
const category = require("./DB/categories");
const allProducts = require("./DB/AllProducts");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const privateKey = "29042000";
app.use(cors());
app.use(express.static("Upload"));
app.use(express.json());

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "Upload");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});
const uploadCategory = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "Upload/SubCategory");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});
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

app.post("/variety", upload.single("imgData"), async (req, res) => {
  try {
    let result = await variety.create({
      heading: req.body.heading,
      category: req.body.category,
      imgData: req.file.filename,
    });

    res.send(
      JSON.stringify({
        data: result,
        status: "success",
      })
    );
  } catch (err) {
    res.send(err);
  }
});

// app.post("/products",uploadCategory.single('imgData'),async (req, res) => {
//   try {
//     // if(Object.keys(req.query).length!=0){
//       let response  = await allProducts.create({...req.body , imgData : req.file.filename})
//       if(response){
//         res.send(JSON.stringify({
//           data : response,
//           status : 'success'
//         }));
//       }
//   } catch (err) {
//     res.send(err);
//   }
// });


app.get("/products/:category",async (req, res) => {
  try {
    let result = ''
    if(Object.keys(req.query).length!=0){
    result = await allProducts.find(req.query);
    }else{
      result = await category.find(req.params);
    }
    if(result){
      if(result.length == 0){
        res.send(
          JSON.stringify({
            status : "success",
            data : result,
            message : "No result found."
          })
        );
      }else{
        res.send(
          JSON.stringify({
            status : "success",
            data : result,
          })
        );
      }
    }else{
      res.send(
        JSON.stringify({
          status : "failed",
          message : "Unknown Error occured.",
        })
      );
    }
  } catch (err) {
    res.send(err);
  }
});

app.get("/variety", async (req, res) => {
  try {
    let result = await variety.find();
    res.send(
      JSON.stringify({
        data: result,
        status: "success",
      })
    );
  } catch (err) {
    res.send(err);
  }
});

app.put("/updateProduct/:_id",async(req ,res)=>{
  try{
    let result = await allProducts.updateOne(req.params , {$inc: {count : req.body.opt}})
    res.send(JSON.stringify({
      data : result,
      status : "success",
      message :"Data updated successfully."
    }))

  }catch(err){
    res.send(err)
  }
});

app.get("/getCartData" , async (req,res)=>{
  try{
    let result = await allProducts.find({count : {$gt : 0}})
    res.send(JSON.stringify({
      data : result,
      status : "success",
    }))
  }catch(err){
    res.send(err)
  }
})

app.get("/searchProduct" , async (req,res)=>{
  try{
    let name = req.query.search;
    let response = await allProducts.find({
      "$or" : [
        {"heading" : {$regex : name}},
        {"category" : {$regex : name}},
        {"subcategory" : {$regex : name}},
      ]
    })
    if(response){
      res.send(JSON.stringify({
        result  : response,
        status :"success",
      }))
    }else{
      res.send(JSON.stringify({
       status : "failed",
       message : "something went wrong"
      }));
    }
  }catch(err){
    res.send(err);
  }
})



// app.post("/advertisementCards", upload.single("img"), async (req, res) => {
//   try {
//     let data = await advertisementCards.create({
//       header: req.body.header,
//       subtitle: req.body.subtitle,
//       img: req.file.filename,
//     });
//     let result = data;
//     console.log(result, "checking image");
//     res.send(
//       JSON.stringify({
//         data: result,
//         message: "Added Successfully",
//         status: "success",
//       })
//     );
//   } catch (err) {
//     console.log(err);
//   }
// });

app.get("/advertisementCards", async (req, res) => {
  try {
    let result = await advertisementCards.find();
    if (result) {
      res.send(
        JSON.stringify({
          data: result,
          status: "success",
        })
      );
    }
  } catch (err) {
    res.send(err);
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
