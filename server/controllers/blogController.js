import blogModel from "../models/blog.model.js";

class BlogController {
  static getAllBlog = async (req, res) => {
    try {
      const allBlogs = await blogModel.find({});
      return res.send({
        message: "Blogs fetched successfully",
        data: allBlogs,
      });
    } catch (error) {
      res.status(500).send({ errorMessage: error?.message });
    }
  };

  static addBlog = async (req, res) => {
    try {
      const { title, category, description } = req.body;
      if (!title || !category || !description) {
        return res.status(400).send({ errorMessage: "Pass a valid data" });
      }
      const addBlog = new blogModel({
        title,
        category,
        description,
        thumbnail: req.file.filename,
        user: req.user._id,
      });
      await addBlog.save();

      res.send({
        message: "Blog added successfully",
      });
    } catch (error) {
      res.status(500).send({ errorMessage: error?.message });
    }
  };

  static getById = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).send({ errorMessage: "Pass a valid data" });
      }

      const blog = await blogModel.findById({ id });
      if (!blog) {
        return res.status(400).send({ errorMessage: "Pass a valid data" });
      }
      return res.send({
        message: "blog fetched successfully",
        data: blog,
      });
    } catch (error) {
      res.status(500).send({ errorMessage: error?.message });
    }
  };
}
export default BlogController;
