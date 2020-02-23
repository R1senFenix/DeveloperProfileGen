const inquirer = require("inquirer");
const axios = require("axios");
const fs = require('fs');
const PersonInfo = require("./PersonInfo.js");


inquirer.prompt([
    {
        type: "input",
        name: "nameInput",
        message: "Enter a GitHub UserName.",
    },
    {
        type: "input",
        message: "Enter a color to display.",
        name: "customColor",
    },
]).then(function ({ nameInput }) {
    const queryUrl = `https://api.github.com/users/${nameInput}`;

    axios.get(queryUrl).then(function (results) {
        const personResults = results;
        //Profile image
        profileImg = personResults.data.avatar_url;
        console.log(personInfo.data.login);
        //userName;
        username = personResults.data.login;
        console.log(username);
        //link to user location
        location = personResults.data.location;
        //link to guthub profile
        profile = personResults.data.url;
        //link to user blog
        blog = personResults.data.blog;
        //user bio
        bio = personResults.data.bio;
        //number of public repos
        pubRepo = personResults.data.public_repos;
        //number of followers
        follower = personResults.data.followers;
        // number of github stars
        stars = personResults.data.starred_url;
        //number following
        following = personResults.data.following;

    });
});

    // function writeToFile(fileName, data) {

    // }

    // function init() {

    //     init();
