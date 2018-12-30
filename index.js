const request = require('request');
var rp = require('request-promise')
const $ = require('cheerio');

const presidentsDetails = require('./getDetails');

const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const fs = require('fs');
const json2xls = require('json2xls');

rp(url)
    .then(function(html){
        const wikiUrls = [];
        for(let i=0; i<45; i++){
            wikiUrls.push($('big > a',html)[i].attribs.href);

        }
        console.log(wikiUrls);
        return Promise.all(
            wikiUrls.map(function(url){
                console.log(url);
                return presidentsDetails('https://en.wikipedia.org'+url)
            })
        );
    })
    .then(function(hello){

       console.log('before printing presidents');
        console.log(hello);

        var xls = json2xls(hello);

        fs.writeFileSync('data.xlsx', xls, 'binary');

    })

    .catch(function(err){

        console.log(err);

    }
)