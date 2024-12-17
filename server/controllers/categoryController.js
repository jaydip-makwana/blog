import CategoryModel from "../models/category.model.js";

class CategoryController {
  static getAllCategory = async (req, res) => {
    try {
      const categories = await CategoryModel.find({});
      return res.send({
        message: "Categories fetched successfully",
        data: categories,
      });
    } catch (error) {
      res.status(500).send({ errorMessage: error?.message });
    }
  };
  static addCategory = async (req, res) => {
    try {
      const { title } = req.body;

      if (!title) {
        return res.status(400).send({ errorMessage: "Pass a title" });
      }

      const isFound = await CategoryModel.findOne({ title: title });

      if (isFound) {
        return res.status(400).send({ errorMessage: "Title already exists" });
      }

      const newTitle = new CategoryModel({
        title,
      });

      const data = await newTitle.save();

      res.send({
        message: "Category added successfully",
        data,
      });
    } catch (error) {
      res.status(500).send({ errorMessage: error?.message });
    }
  };
}
export default CategoryController;
