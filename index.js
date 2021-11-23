const express = require("express")

const app = express();

const repoContext = require("./repository/repository-wrapper");
const cors = require("cors");
const {validationSong} = require("./middleware/songs-validation");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/api/songs", (req,res) =>{
    const songs = repoContext.songs.findAllSongs();
    return res.send (songs);
});


app.get("/api/songs/:id", (req,res) =>{
    const id = req.params.id;
    const song = repoContext.songs.findSongById(id);
    return res.send (song);
});

app.post("/api/songs", [validationSong], (req,res) =>{
    const newSongs = req.body;
    const addedsongs = repoContext.songs.createSong(newSongs)
    return res.send(addedsongs);
});

app.put("/api/songs/:id", [validationSong], (req,res) =>{
    const id = req.params.id;
    const songsPropertiesToUpdate = req.body;
    const updatedsongs = repoContext.songs.updateSong(id,songsPropertiesToUpdate);
    return res.send(updatedsongs)
});

app.delete("/api/songs/:id",(req,res)=>{
    const id = req.params.id;
    const updatedDateSet = repoContext.songs.deleteSong(id);
    return res.send(updatedDataSet);
});



app.listen(5000,function(){
    console.log("server started .Listening on port 5000")
});