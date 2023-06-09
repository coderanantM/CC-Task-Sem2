const express = require('express');
const { json, urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const viewpath = path.join(__dirname, './views')

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

app.set('view engine', 'hbs')
app.set('views', viewpath)

app.use(express.static(viewpath))
app.get('/', (req, res) => {
    res.render('trial')
})

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blogapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Define the Blog schema and model
const blogSchema = new mongoose.Schema({
  author: String,
  content: String,
  heading: String,
  date: { type: Date, default: Date.now },
});
const Blog = mongoose.model('Blog', blogSchema);

// Create a new blog
app.post('/blogs', async (req, res) => {
  const { author, content, heading } = req.body;
  try {
    const newBlog = await Blog.create({ author, content, heading });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

// Get all blogs
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blogs' });
  }
});

// Get a specific blog by ID
app.get('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ error: 'Blog not found' });
    } else {
      res.json(blog);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blog' });
  }
});

// Update a blog by ID
app.put('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  const { author, content, heading } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { author, content, heading },
      { new: true }
    );
    if (!updatedBlog) {
      res.status(404).json({ error: 'Blog not found' });
    } else {
      res.json(updatedBlog);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

// Delete a blog by ID
app.delete('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndRemove(id);
    if (!deletedBlog) {
      res.status(404).json({ error: 'Blog not found' });
    } else {
      res.json({ message: 'Blog deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
