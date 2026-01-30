const http = require('http');
const https = require('https');

const server = http.createServer((req, res) => {
    // Inat TV'nin asıl sayfa adresi
    const targetUrl = 'https://inattv1247.xyz/channel.html?id=zirve';

    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
            'Referer': 'https://inattv1247.xyz/',
            'X-Requested-With': 'com.inat.tv.pro'
        }
    };

    https.get(targetUrl, options, (remoteRes) => {
        let data = '';

        remoteRes.on('data', (chunk) => { data += chunk; });

        remoteRes.on('end', () => {
            // REKLAMLARI VE LOGOLARI TEMİZLEME OPERASYONU
            // 1. Reklamı devre dışı bırak
            data = data.replace('prerollEnabled:true', 'prerollEnabled:false');
            // 2. Reklam videosunu boşalt
            data = data.replace(/prerollVideo:'.*?'/, "prerollVideo:''");
            // 3. Logoyu gizle
            data = data.replace('display:block!important', 'display:none!important');
            // 4. Otomatik oynatmayı zorla
            data = data.replace('autoPlay:false', 'autoPlay:true');

            res.writeHead(200, { 
                'Content-Type': 'text/html; charset=UTF-8',
                'Access-Control-Allow-Origin': '*' 
            });
            res.end(data);
        });

    }).on('error', (err) => {
        res.writeHead(500);
        res.end('Sunucu Hatası: ' + err.message);
    });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Sunucu ${port} portunda calisiyor...`);
});
