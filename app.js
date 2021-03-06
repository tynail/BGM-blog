var express         = require("express"),
    mongoose        = require("mongoose"),
    Game            = require("./models/game"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override");
var app = express();
mongoose.connect("mongodb://localhost:27017/bgm_app", {useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs"); // Using ejs as template
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/public'));

//     name: "Broforce",
//     image:"https://steamcdn-a.akamaihd.net/steam/apps/274190/header.jpg?t=1511400974"


//     name: "Nier Automata",
//     image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Nier_Automata_cover_art.jpg/220px-Nier_Automata_cover_art.jpg"

//     name: "Monster Hunter World",
//     image: "https://steamcdn-a.akamaihd.net/steam/apps/582010/header.jpg?t=1550022250"


// Route =================================================
// index route
app.get("/", function(req,res){
  res.render("landing");
});

//INDEX ROUTE //Show all games routes
app.get("/games" , function(req,res){
  Game.find({}, function(err,allGames){
    if(err){
      console.log(err);
    } else {
      res.render("game", {games:allGames});
    }
  });
});

//NEW ROUTE //  Show new game form
app.get("/games/new",function(req,res){
  res.render("new");
});

//CREATE ROUTE // Create a new game then redirect
app.post("/games", function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newGame = {name:name, image:image, description:description};

  //Create a new Games and save to db
  Game.create(newGame, function(err,newlyCreated){
      if(err){
        console.log(err);
      }else {
        console.log(newlyCreated);
        res.redirect("/games");
      }
  });
});

// SHOW ROUTE // Show info about one specific games
app.get("/games/:id",function(req,res){
    Game.findById(req.params.id, function(err,foundGame){
        if(err){
          console.log(err);
        } else {
          res.render("show", {game:foundGame});
        }
    });
  });

//EDIT ROUTE // Show Edit form for a game
app.get("/games/:id/edit",function(req,res){
  Game.findById(req.params.id, function(err,foundGame){
      if(err){
        console.log(err);
      }else {
        res.render("edit", {game:foundGame});
      }
  });
});

// UPDATED ROUTE // Update a particular game, then redirect
app.put("/games/:id",function(req,res){
  //  find and update the correct game
  Game.findByIdAndUpdate(req.params.id, req.body.game, function(err,updatedGame){
      if(err){
        console.log(err);
        res.redirect("game");
      } else {
        res.redirect("/games/" + req.params.id);
      }
  });
});

// DESTROY ROUTE // Delete a particular game, then redirect
app.delete("/games/:id",function(req,res){
  Game.findByIdAndRemove(req.params.id, function(err){
      if(err){
        console.log(err);
      } else {
        res.redirect("/games");
      }
  });
});




// Set the port for the node server // localhost:3000
app.listen(3000, function(){
  console.log("BGM server has started!");
});
