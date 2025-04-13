const express = require('express');
const app = express();

app.use(express.json());

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960 },
    { id: 3, title: '1984', author: 'George Orwell', publishedYear: 1949 }
];

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/api/books/:bookId', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.bookId));
    if (!book) return res.status(404).send('Book not found');
    res.status(200).json(book);
});

app.post('/api/books', (req, res) => {
    const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    const book = {
        id: newId,
        title: req.body.title,
        author: req.body.author,
        publishedYear: req.body.publishedYear
    };
    books.push(book);
    res.status(201).json(book);
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});