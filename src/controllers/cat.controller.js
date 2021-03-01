const CatModel = require("../models/cat.model");
const mongoose = require("mongoose");
exports.create = async (req, res) => {
  try {
    const createdCat = new CatModel(req.body);
    await createdCat.save();
    return res.send({
      message: "New cat stored",
      data: createdCat,
    });
  } catch (err) {
    return res.status(500).send({
      error: {
        message: "Server ERROR :(",
      },
    });
  }
};

exports.read = async (req, res) => {
  try {
    const cats = await CatModel.find();
    if (cats.length < 1)
      return res.send({
        message: "There is no cat data",
        data: cats,
      });
    return res.send({
      message: "Cat succesfully loaded",
      data: cats,
    });
  } catch (err) {
    return res.status(500).send({
      error: {
        message: "Server ERROR :(",
      },
    });
  }
};

exports.readOne = async (req, res) => {
  try {
    const { id } = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (isValid) {
      const cat = await CatModel.findById(id);
      if (!cat)
        return res.send({
          message: "There is no cat data",
          data: cat,
        });
      return res.send({
        message: `cat with id:${id} succesfully loaded`,
        data: cat,
      });
    } else {
      return res.status(400).send({
        message: "Not a valid mongoose idObject",
      });
    }
  } catch (err) {
    return res.status(500).send({
      error: {
        message: "Server ERROR :(",
      },
    });
  }
};
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (isValid) {
      let updateCat = await CatModel.findByIdAndUpdate(id, req.body);
      if (updateCat) {
        await updateCat.save();
        updateCat = await CatModel.findById(id);
        return res.send({
          message: "cat succesfully updated",
          data: updateCat,
        });
      }
      return res.status(400).send({
        message: `there is no data with id:${id}`,
      });
    } else {
      return res.status(400).send({
        message: "Not a valid mongoose idObject",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Server ERROR :(",
      },
    });
  }
};
exports.deletOne = async (req, res) => {
  try {
    const { id } = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (isValid) {
      const catDeleted = await CatModel.findByIdAndDelete(id);
      if (catDeleted)
        return res.send({
          message: `cat with id:${id} succesfully deleted`,
        });
      return res.status(400).send({
        message: `there is no data with id:${id}`,
      });
    } else {
      return res.status(400).send({
        message: "Not a valid mongoose idObject",
      });
    }
  } catch (err) {
    return res.status(500).send({
      error: {
        message: "Server ERROR :(",
      },
    });
  }
};
exports.deleteAll = async (req, res) => {
  try {
    await CatModel.deleteMany({});
    return res.send({
      message: "cat collection deleted",
    });
  } catch (err) {
    return res.status(500).send({
      error: {
        message: "Server ERROR :(",
      },
    });
  }
};
