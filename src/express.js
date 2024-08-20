//* CONTOH PENGGUNAAAN FRAMEWORK EXPRESS 

const express = require('express');
const cors = require('cors');
const { addContact, getContacts, deleteContact } = require('./data'); // sebagai 'contoh' saja 

//* Define port
const PORT = 9000;

//* Membuat aplikasi express (http server)
const app = express();
// menambahkan middleware pada express
app.use(express.json());
// access-control-allow-origin: *
app.use(cors());

//* Routes
app.post('/contacts', (request, response) => { // (request, response) adalah handler. Path '/contact' sebagai 'contoh' saja
    const { name, email } = request.body; // request body untuk mendapatkan data dari body yg otomatis sudah di parse menjadi JSON,
                                          // dan langsung mendapatkannya secara primitif { name, email}.
    const id = addContact({ name, email }); // fungsi addContact() adalah sebagai 'contoh' saja

    // status code 201 untuk menambahkan data/POST
    response.status(201).json({ success: true, data: { id } });
});

app.get('/contacts', (_, response) => { // _, artinya (request tdk diperlukan)
    const contacts = getContacts(); // fungsi getContats() sebagai 'contoh' saja

    // default status code 200 
    response.json({ success: true, data: { id } });
});

app.delete('/contacts/:id', (request, response) => { // Path '/contact/:id' sebagai 'contoh' saja
    const { id } = request.params; // request params untuk mereplace :id sesuai id yg dikirim pada url yg otomatis sudah di parse menjadi JSON, 
                                   // dan langsung mendapatkannya secara primitif { id }.
    const deleted = deleteContact(id); // fungsi deleteContact() adalah sebagai 'contoh' saja

    if (deleted) {
        response.json({ success: true, data: { id } });
        return;
    }

    response.status(404).json({ success: false, errora: 'Contact not found' });
});

// jika ingin mengubah halaman 404 (default), maka perlu mendefine status(404)
app.use((_, response) => { 

    response.status(404).json({ success: false, error: 'Not Found' });
});

//* Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan pada port http://localhost:${PORT}`);
});