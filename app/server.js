let axios = require("axios");
let express = require("express");
let env = require("../env.json");
let baseUrl = env["base_api_url"];

let app = express();
let port = 3000;
let hostname = "localhost";

app.use(express.static("public"));
app.use(express.json());


const stations = [
    "Elm St",
    "Main St",
    "Norristown TC",
    "Conshohocken",
    "Spring Mill",
    "Miquon",
    "Ivy Ridge",
    "Manayunk",
    "Wissahickon",
    "East Falls",
    "Allegheny",
    "North Broad St",
    "Temple U",
    "Jefferson Station",
    "Suburban Station",
    "30th Street Station",
    "Penn Medicine Station",
];


app.get("/next",function(req,res){
    let origin=req.query.origin;
    let destination=req.query.destination;
    if(!stations.includes(origin) || !stations.includes(destination) ){
        res.status(400);
        res.json({error: "Invalid origin or destination"})
    }
    else if(origin==destination){
        res.status(400);
        res.json({error: "Origin and destination must be different"})
    }
    else{
        axios.get(`${baseUrl}/${origin}/${destination}`)
            .then(function(response){
                res.status(200);
                console.log(response.data);
                res.json({trains:response.data})
            })
    }
})




app.listen(process.env.PORT || port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
