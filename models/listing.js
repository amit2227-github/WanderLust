const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://unsplash.com/photos/landscape-photography-of-seashore-under-cumulus-clouds-U6t80TWJ1DM",
        set: (v) => v === "" ? "https://unsplash.com/photos/landscape-photography-of-seashore-under-cumulus-clouds-U6t80TWJ1DM"
        : v,
    },
    price:Number,
    location:String,
    country:String,
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports=Listing; 