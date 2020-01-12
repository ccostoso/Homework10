require("dotenv").config();
let keys = require("./keys");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
const axios = require("axios");

const input = process.argv.slice(2);
const command = input[0]
const parameter = input.slice(1).join(" ");

switch (command) {
    case "concert-this":
        const url = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";
        
        axios
            .get(url)
            .then(response => {
                // console.log(response.data);
                console.log(`Here are three upcoming events for ${parameter}:`);

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
        console.log("looking good mate");
    
        if (!parameter) parameter = "All the Small Things";
    
        spotify
            .search({type: "track", query: parameter})
            .then(response => {
                console.log(JSON.stringify(response));


            })
            .catch(err => {
                console.log(err);
            })
        break;
    case "movie-this":

        break;
    case "do-what-it-says":

        break;
    default:
        console.log("Try again!");
}



// Date of the Event (use moment to format this as "MM/DD/YYYY")