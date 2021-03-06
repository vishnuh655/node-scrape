var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

url = 'http://www.imdb.com/title/tt1825683/';

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var title, release, rating;
    var json = { title : "", release : "", rating : ""};

    $('.title_wrapper').filter(function(){
        var data = $(this);

        title = data.children().first().text();
        release = data.children().first().children().first().children().first().text();

        json.title = title.trim();
        json.release = release;
    })

    $('.imdbRating').filter(function(){
        var data = $(this);
        rating = data.children().first().children().first().children().text();

        json.rating = rating;
    })

    // $('.subtext').filter(function(){
    //     var data = $(this);
    //     rating = data.children().first().children().first().children().text();

    //     json.rating = rating;
    // })
}


fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

res.send('Check your console!')

    }) ;
})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;