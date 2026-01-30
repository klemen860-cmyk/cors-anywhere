cors_proxy.createServer({
    originWhitelist: [],
    requireHeader: [],
    setHeaders: {
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
        'x-requested-with': 'com.inat.tv.pro'
    },
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere...');
});
