const express = require('express');
const dataService = require('./data/dataService');
const app = express();

app.get('/posts', async (req, res) => {
    try {
        const posts = await dataService.fetchPosts();
        console.log('Data successfully retrieved from JSONPlaceholder');
        res.json(posts);
    } catch (error) {
        res.status(500).send('Error fetching posts');
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});