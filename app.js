var express       = require("express"),
    bodyParser    = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));


app.set("view engine", "ejs"); // Using ejs as template

var games = [
  { name: "Broforce",
    image:"https://steamcdn-a.akamaihd.net/steam/apps/274190/header.jpg?t=1511400974"
  },

  {
    name: "Grim Dawn",
    image: "https://steamcdn-a.akamaihd.net/steam/apps/219990/capsule_616x353.jpg?t=1507745184"
  },

  {
    name: "Nier Automata",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Nier_Automata_cover_art.jpg/220px-Nier_Automata_cover_art.jpg"
  },

  {
    name: "Monster Hunter World",
    image: "https://steamcdn-a.akamaihd.net/steam/apps/582010/header.jpg?t=1550022250"
  },
];

// Route =================================================
// index route
app.get("/", function(req,res){
  res.render("landing");
});

app.get("/games" , function(req,res){
  res.render("game", {games:games});
});








// Set the port for the node server // localhost:3000
app.listen(3000, function(){
  console.log("BGM server has started!");
});
