//* CONTOH PENGGUNAAAN FRAMEWORK FASTIFY

const cors = require('@fastify/cors'); // install module @fastify/cors
const fastify = require('fastify');
const { addContact, getContacts, deleteContact } = require('./data'); // sebagai 'contoh' saja 

const PORT = 9000;

//* Membuat instance dari fastify (mirip express)
const app = fastify();

// access-control-allow-origin: *
app.register(cors);

//* Gaya Hapi
app.route({
    method: 'POST',
    url: '/contacts', // if hapi use path, then fastify use url
    handler: (request, reply) => {
        const { name, email } = request.body; 
        const id = addContact({ name, email }); 
        reply.send({ success: true, data: { id } }).code(201);
    },
});

//* Gaya Express
app.get('/contacts', (_, reply) => {
    const contacts = getContacts();
    reply.send({ success: true, data: { contacts }});
});

app.listen({ port: PORT, }, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});