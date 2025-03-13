var Kraken = require('kraken');

var kraken = new Kraken({
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
});

var params = {
    url: 'https://awesome-website.com/images/header.jpg',
    wait: true
};

kraken.url(params, function(err, data) {
    if (err) {
        console.log('Failed. Error message: %s', err);
    } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url);
    }
});