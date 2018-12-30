// Scrape a linkedin profile for the public contents
var linkedinScraper = require('linkedin-scraper2');
var url = 'https://sg.linkedin.com/in/sanjeeth-kumar-mandal-92233b99';
 
linkedinScraper(url, function(err, profile) {
    if (err) {
        console.log(err);
    } else {
        console.log(profile);
    }
});