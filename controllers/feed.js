const { validationResult } = require('express-validator')
const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '101',
        title: 'First Post',
        content: 'This is the first post!',
        imageUrl: 'images/duck.jpg',
        creator: {
          name: 'Jaydeep', 
        },
        createdAt: new Date(), 
      }
    ]
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(
        {
          message: 'validation failed, entred data is incorrect',
          errors: errors.array()
        }
      )
  }
  const title = req.body.title;
  const content = req.body.content;
  // create post 
  const post = new Post({
    title: title, 
    content: content, 
    creator: { name: 'Jaydeep' },
    imageUrl: 'null'
  })
  post.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Post created successfully... :)',
        post: result
      })
    })
    .catch(err => {
      console.log(err);
    })
};
