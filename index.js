const inquirer = require("./Assets/node_modules/inquirer");
const axios = require("./Assets/node_modules/axios");
const fs = require('fs');
const generateHTML = require('./Assets/generateHTML.js');
var pdf = require('./Assets/node_modules/html-pdf');



class PersonInfo {
    constructor(personName, profileImg, username, location, profile, blog, bio, pubRepo, follower, stars, following, getColor) {
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
        this.getColor = getColor;
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
        getColor = data.customColor;

        personObject = new PersonInfo(personName, profileImg, username, location, profile, blog, bio, pubRepo, follower, stars, following, getColor);

        //JSON file so i can see the object whenever
        fs.writeFile(`user${username}.JSON`, JSON.stringify(personObject, null, '\t'), function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("New JSON Available!");

        })

        const HTMLFile = generateHTML(personObject);
        console.log(personObject);

        fs.writeFile(`user${username}.HTML`, HTMLFile, function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("Success!");

            //make into pdf
            var html = fs.readFileSync(`user${username}.HTML`, 'utf8');
            var options = { format: 'Letter' };

            pdf.create(html, options).toFile(`user${username}.pdf`, function (err, res) {
                if (err) return console.log(err);
                console.log(res); // { filename: '/app/businesscard.pdf' }
            });


        })

    });
})


