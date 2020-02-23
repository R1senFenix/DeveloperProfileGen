const inquirer = require("inquirer");
const axios = require("axios");
const fs = require('fs');
const generateHTML = require("./generateHTML.js");

class PersonInfo {
    constructor(personName, profileImg, username, location, profile, blog, bio, pubRepo, follower, stars, following) {
        this.personName = personName;
        this.profileImg = profileImg;
        this.username = username;
        this.location = location;
        this.profile = profile;
        this.blog = blog;
        this.bio = bio;
        this.pubRepo = pubRepo;
        this.follower = follower;
        this.stars = stars;
        this.following = following;
    }
}

inquirer.prompt([
    {
        type: "input",
        message: "Enter a GitHub UserName.",
        name: "name",

    },
    {
        type: "list",
        message: "Enter a color to display.",
        name: "customColor",
        choices: [
            "green",
            "blue",
            "pink",
            "red",
        ]
    },
]).then(function (data) {
    var personObject = {};
    const queryUrl = `https://api.github.com/users/${data.name}`;

    axios.get(queryUrl).then(function (results) {
        const personResults = results;
        //console.log(results);
        personName = personResults.data.name.split(".").join(" ");
        //console.log(personName);
        //Profile image
        profileImg = personResults.data.avatar_url;
        //console.log(profileImg);
        //userName;
        username = personResults.data.login;
        //console.log(username);
        //link to user location
        location = personResults.data.location;
        //console.log(location);
        //link to guthub profile
        profile = personResults.data.url;
        //console.log(profile);
        //link to user blog
        blog = personResults.data.blog;
        //console.log(blog);
        //user bio
        bio = personResults.data.bio;
        //console.log(bio);
        //number of public repos
        pubRepo = personResults.data.public_repos;
        //console.log(pubRepo);
        //number of followers
        follower = personResults.data.followers;
        //console.log(follower);
        // number of github stars
        stars = personResults.data.starred_url;
        //console.log(stars);
        //number following
        following = personResults.data.following;
        //console.log(following);
        //console.log(data.customColor);

        personObject = new PersonInfo(personName, profileImg, username, location, profile, blog, bio, pubRepo, follower, stars, following);
        console.log(personObject);
        fs.writeFile(`user${username}.JSON`, JSON.stringify(personObject, null, '\t'), function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("Success!");

        });

    }).then(function{
        generateHTML(data.customColors)
    })


});