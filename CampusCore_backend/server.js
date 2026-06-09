const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routers/admin.routes.js");


dotenv.config();
const app = express();
const port = process.env.PORT || 4000


/* ******************** middleware configration start here ******************** */
app.use(cors({
  origin: ["http://localhost:5173","http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
/* ******************** middleware configration ends here ******************** */


/* ******************** routers connection start here ******************** */
app.use("/CampusCore",adminRouter);
/* ******************** routers connection end here ******************** */


/* ******************** mongodb connection start here ******************** */
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("\n✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅\n");
    console.log("Database connected successfully!");
    console.log("\n✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅\n");
})
.catch((err) => {
    console.log("\n❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌\n");
    console.log("Database connection failed");
    console.log(err.message);
    console.log("\n❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌\n");
});
/* ******************** mongodb connection ends here ******************** */

app.get("/",(req,res)=>{
    res.json({Status:true,message:"runnin fine"});
});


/* ******************** server connection start here ******************** */
app.listen(port, async()=>{
    console.log(`Server is runung on port ${port}`);
    console.log(`The server running on => http://localhost:${port}`);
    console.log(`The server running on => http://127.0.0.1:${port}`);
});
/* ******************** server connection end here ******************** */