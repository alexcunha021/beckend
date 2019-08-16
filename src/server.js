const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const app = express();

app.use(cors())
const server = require('http').Server(app);
const io = require('socket.io')(server)


io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
})

mongoose.connect('conexão com mongo', { useNewUrlParser: true})
//Use cadastra um modulo dentro do express
// express.json() ajuda o servidor a entender as requisições que estao vindo em formato json


app.use((req, res, next) => {
    req.io = io;
    return next();
})
app.use(express.json());

// Permite o enviou de arquivo
app.use(express.urlencoded({ extended: true}));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(require('./routes'));
app.listen(process.env.PORT || 3333);