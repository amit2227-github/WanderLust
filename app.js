const express=require("express");
const app= express();
const mongoose=require("mongoose");
const Listing = require("./models/listing.js");
const path=require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


main()
.then(()=>{ console.log("Connected to DB");})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Auratravel');
}



app.get("/",(req,res)=>{
    res.send("root is wrking");
});



//index Route
app.get("/Listings", async (req,res)=>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs",{ allListings});
});

//New Rout

app.get("/listings/new",(req,res)=>{
   res.render("listings/new.ejs");
})

//Show Route

app.get("/listings/:id",async (req,res)=>{
   let { id } =req.params;
   const listing = await Listing.findById(id );
   res.render("listings/show.ejs",{listing});
});


//Create Route
app.post("/listings",async (req,res)=>{
   const newListing=new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");
})


//Edit Route

app.get("/listings/:id/edit",async (req,res) => {
   let { id } =req.params;
   const listing = await Listing.findById(id );
   res.render("listings/edit.ejs",{ listing });
});

//update Route
app.put("/Listings/:id",async (req,res) => {
    let { id } =req.params;
    await Listing.findByIdAndUpdate(id ,{ ...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//Delete Route
app.delete("/listings/:id", async(req,res) =>{
   let { id }=req.params;
   let deleted = await Listing.findByIdAndDelete(id);
   console.log(deleted);
   res.redirect("/Listings");
})



//app.get("/testListing",async (req,res)=>{
   //let sampleListing = new Listing({
   //  title:"My New Villa",
   //  description:"By the beach",
    // price:1200,
    // location:"Los Angeles",
    // country:"USA",
  // });
  // await sampleListing.save();
//   console.log("sample was saved");
 //  res.send("successful Tsting");
//});



app.listen(8080 ,(req,res)=>{
   console.log("Working");
});