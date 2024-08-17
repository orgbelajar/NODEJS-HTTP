const http = require('http');

//* Membuat sebuah HTTP server
const server = http.createServer();

//* Menjalankan Server
const PORT = 9000;
server.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
})