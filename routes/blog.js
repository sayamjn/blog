const express = require('express');
const blogs = require('../model/blogs'); 
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const data = await blogs.find({});
        res.render('index', { title: 'Home', data });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const blog = await blogs.findById(req.params.id);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        res.render('blog', { title: 'Edit Blog', blog });
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, content } = req.body;

        const blog = new blogs({ title, content });
        await blog.save();

        res.redirect('/');
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { title, content } = req.body;

        const blog = await blogs.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        res.redirect('/');
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const blog = await blogs.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        res.redirect('/');
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
