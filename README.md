# Homework10
LIRIbot

# Introduction
LIRIbot is a Language Interpretation and Recognition Interface that can provide users with information about any given music band, such as upcoming performances in the user's area.

# Commands

* LIRIbot takes in a variety of commands, which, when followed by a parameter, can provide you with information about live performances, songs and movies!

* Here's a list of available commands:

    * node liri concert-this [$PARAM]
        
        * "concert-this" can give you a list of three upcoming concerts being held by an artist. Simply replace [$PARAM] is an the name of an artist you'd like to see in-person!

    * node liri spotify-this-song [$PARAM]

        * "spotify-this-sing" can give you information about a song on Spotify, including a preview link! As above, replace [$PARAM] with the name of a song to pull up the information.

    * node liri movie-this [$PARAM]

        * "movie-this" will provide you with information about a movie listed on the Open Movie Database. Simply replace [$PARAM] with the name of a movie to retrieve the information!

    * node liri do-what-it-says

        * You can edit random.txt to input one of the above commands, and comma and parameter to get LIRI to execute said function!

LIRIbot uses Javascript running in a Node.js environment to pull information from Spotify, OMDB and Bands in Town APIs. In addition, LIRIbot employs the Axios, Spotify, Moment and DotEnv dependencies.

If you'd like to see a history of your history, check out the "log.txt" file in LIRIbot's root directory.
