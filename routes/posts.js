var express = require('express');
var router = express.Router();
const axios = require('axios');

// post id generator
const { randomBytes } = require('crypto');

// Store all posts created here
const posts = {};

router
  .route('/')
  .get((req, res) => {
    res.json(posts);
  })
  .post(async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = { id, title };

    // Emit PostCreated event
    const eventRes = await axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: posts[id],
    });
    res.status(201).send(posts[id]);
  });

module.exports = router;
