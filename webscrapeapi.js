const request = require('request');
const cheerio = require('cheerio');

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/scrape', (req, res) => {

    console.log('request came to scrape!!')
    url = 'http://www.imdb.com/title/tt1229340/';

    request (url, (error, response, html) => {

            if(!error){
                var $ = cheerio.load(html);
                var title, rating;

                var json = {title:"",rating:""};

                json.title = $('#star-rating-widget',html).attr('data-title');
                json.rating = $('.imdbRating',html).text();

                //console.log(json.title)
                //console.log(json.rating)

                fs.writeFile('output.json',JSON.stringify(json,null,4))
            }
        })

        var file = path.join(__dirname,'output.json');
        res.download(file, (err) => {
            if(err){
                console.log('Error');
                console.log(err);
            }else{
                console.log('Successfully sent to browser')
            }
        })

    //res.send('success');
})


app.listen('8989');

console.log('server running on 8989');

exports = module.exports = app;