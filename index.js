require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const url = require('url');
app.use(bodyParser.urlencoded({ extended: false }));
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
	res.json({ greeting: 'hello API' });
});

const [longURLarray, shortURLarray] = [[], []];


app.post('/api/shorturl', (req, res) => {
	const { url: myURL } = req.body;

	if(!myURL.includes('https://') && !myURL.includes('http://')){
		res.json({'error': 'invalid url'});
	}else{
		if (()=>{
			try{
				new URL(myURL);
				return true;
			}catch(err){
				return false;
			}
		}) {
			const { hostname } = url.parse(myURL);
			dns.lookup(hostname, (err, addresses, family) => {
			if (err) {
				res.json({"error": "Invalid Hostname"});
				console.log('DNS lookup failed:', err);
			} else {
				// Check whether original_url is in longURLarray
				let oriURLCheck = longURLarray.indexOf(myURL);
				// If original_url not in longURLarray
				if(oriURLCheck === -1){
					// create an incrementing short url variable
					let myShortURL = shortURLarray.length;
					// save both the the original_url and the short_url in the shortURLarray and longURLarray
					shortURLarray.push(myShortURL);
					longURLarray.push(myURL);
					// display the json data associated with the original_url and the short_url
					res.json({original_url: myURL, short_url: myShortURL});
				}else{
					// else if original_url is in longURLarray
					//get the index of the original_url
					let myShortURL = longURLarray.indexOf(myURL);
					//display the json of original_url together with it's position
					res.json({original_url: myURL, short_url: myShortURL});
				}
			}
			});
		} else {
			res.json({"error": "Invalid Hostname"});
			console.log('Invalid URL:', myURL);
		}
	}
	
})

app.get('/api/shorturl/:oneURL', (req, res)=>{
	const {oneURL} = req.params;
	const myURL = Number(oneURL);
	let checkShort = shortURLarray.indexOf(myURL);
	if(checkShort === -1){
		//send a json describing the error
		res.json({"error": "No short URL found for the given input"});
	}else{
		//get the index of the url in longURLarray using shortURLarray
		let sampleURL = longURLarray[myURL];
		//redirect to the resulting url
		res.redirect(sampleURL);
		//console.log(sampleURL);
	}
});


app.listen(port, function() {
	console.log(`Listening on port ${port}`);
});
