const mongoose=require('mongoose');

modules.exports=async function mogoConnect(clusterUrl){
    mongoose.connect(clusterUrl)
    .then(()=>{
        console.log("connected to MongoDB successfully!");
    })
    .catch(err=>{
        console.log(err);
    })
}