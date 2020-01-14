require("dotenv").config();
let keys = require("./keys");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
const axios = require("axios");

const fs = require("fs");

const input = process.argv.slice(2);
const command = input[0]
let parameter = input.slice(1).join(" ");

const app = (com, para) => {
    switch (com) {
        case "concert-this":
            const url = "https://rest.bandsintown.com/artists/" + para + "/events?app_id=codingbootcamp";
            
            axios
                .get(url)
                .then(response => {
                    console.log(`Here are three upcoming events for ${para}:`);
    
                    const top3 = response.data.slice(0,3);
    
                    top3.forEach((ele, i) => {
                        console.log(`${i + 1}:`);
                        console.log(`Venue name: ${ele.venue.name}`);
                        if (ele.venue.region !== "" ) {
                            console.log(`Venue location: ${ele.venue.city},  ${ele.venue.region}`);
                        } else {
                            console.log(`Venue location: ${ele.venue.city}`);
                        }
                        console.log(`${ele.datetime}`);
                    })
                })
                .catch(err => {
                    console.log(err);
                });
            break;
        case "spotify-this-song":       
            if (!para) para = "The Sign";
        
            spotify
                .search({type: "track", query: para})
                .then(response => {
                    const top = response.tracks.items[0];
    
                    console.log(
                        `Artist: ${top.artists[0].name}
                        \nName: ${top.name}
                        \nLink on Spotify: ${top.album.external_urls.spotify}
                        \nAlbum Name: ${top.album.name}`
                    );
                })
                .catch(err => {
                    console.log(err);
                });
            break;
        case "movie-this":
            if (!para) para = "Mr. Nobody";
    
            axios.get(`http://www.omdbapi.com/?t=${para}&y=&plot=short&apikey=trilogy`)
            .then( response => {
                  console.log("The movie's rating is: " + response.data.imdbRating);
                  console.log(`Title: ${response.data["Title"]}
                  \nYear: ${response.data["Year"]}
                  \nIMDB Rating: ${response.data["imdbRating"]}
                  \nRotten Tomatoes Rating: ${response.data["Ratings"][1]["Value"]}
                  \nCountry: ${response.data["Country"]}
                  \nLanguage: ${response.data["Language"]}
                  \nPlot: ${response.data["Plot"]}
                  \nActors: ${JSON.stringify(response.data["Actors"])}`);
                }
              );
            break;
        case "do-what-it-says":
            fs.readFile("./random.txt", "utf8", (err, data) => {
                if (err) throw err;
                let instructions = data.split(",");
                app(instructions[0], instructions[1]);
            });
            break;
        default:
            console.log("Try again!");
    }
}

app(command, parameter);
const log = `${command}, ${parameter}\n`;
fs.appendFile("log.txt", log, "utf8", err => {
    if (err) throw err;
    console.log("log appended!");
})