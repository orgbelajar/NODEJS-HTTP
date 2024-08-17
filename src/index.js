const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');

    if (request.method !== 'GET') {
        response.statusCode = 405;
        // stringify untuk mengubah JS object menjadi JSON string
        response.end(JSON.stringify({
            status: 'fail',
            message: 'method not allowed',
            data: {}, // data kosong / tdk memberi data apapun
        }));
        return; // biar langsung keluar dan tidak mengeksekusi kode yg dibawahnya
    }

    if (request.url === '/') {
        response.statusCode = 200;
        response.end(JSON.stringify({
            status: 'success',
            message: 'Halaman Homepage',
            data: {},
        }));
        return; 
    }

    if (request.url === '/articles') {
        response.statusCode = 200;
        response.end(JSON.stringify({
            status: 'success',
            message: 'Halaman Articles',
            data: {
                articles: [
                    'article 1',
                    'article 2',
                    'article 3',
                ]
            },
        }));
        return; 
    }

    response.statusCode = 404;
    response.end(JSON.stringify({
        status: 'fail',
        message: 'page not found',
        data: {},
    }));
    // tidak perlu return karena sudah paling bawah
}

//* Membuat sebuah HTTP server
const server = http.createServer(requestListener);

//* Menjalankan Server
const PORT = 9000;
server.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
});