const cheerio = require('cheerio')
const http = require('http');
const axios = require('axios');
const port = process.env.PORT || 8080;
const express = require('express');
const formater = require('./src/regex_replacer')
const app = express();

const server = http.createServer(app);

app.get('/detect',(req,res) => {
    const query = req.query.query;
    console.log(query);
    url = `https://www.google.com/search?q=lirik+lagu+${query}`;
    let js = [];
    axios.get(url)
        .then((response) => {
            let $ = cheerio.load(response.data);
            try {
                const title = $('span.BNeawe.tAd8D.AP7Wnd').text()
                var band = $('span.BNeawe.s3v9rd.AP7Wnd')[1].children[0].data
                var Penulis = new RegExp('Penulis lagu:(.*)')
                const songwriter = $('div.xpc').text();
                js.push({
                    band:band,
                    title:title,
                    song:songwriter.match(Penulis)[1]
                })

                const lyric = $('div.xpc').text();
                (async () => {
                    js.push({
                        lyric:await formater.regex(lyric)
                    })
                    await res.json({
                        Status:{Response:200,Api_Version:'1.0.0'},
                        img:js[0].img,
                        Band_Name: js[0].band,
                        Song_Title: js[0].title,
                        Song_Writer:js[0].song,
                        lyric: js[1].lyric
                        }) 
                        
                 })()
            } catch (error) {
                res.json({
                    error:'Um Sorry :( Lyric Not Found'
                })
            } 
    });
})

server.listen(port, function() {
    console.log('App running on *: ' + port);
  });