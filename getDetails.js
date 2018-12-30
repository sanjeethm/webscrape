const rp = require('request-promise')

const $ = require('cheerio');

 

//const url = 'https://en.wikipedia.org/wiki/George_Washington';

 

const presidentDetails = function(url){

    return rp(url)
    .then(function(html){
        //console.log(html);
        return {
            name : $('.firstHeading',html).text(),
            birthday: $('.bday',html).text(),
        };
        // console.log($('.firstHeading',html).text())
        // console.log($('.bday',html).text())
    })
    .catch(function(err){
        console.log(err);
    });
};

module.exports = presidentDetails;