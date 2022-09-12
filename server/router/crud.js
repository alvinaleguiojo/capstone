const express = require("express");
const router = express.Router();

router.patch("/update/:id", async (req, res) => {
  try {
    await Todos.findById(req.body.id)
      .then((updatedTodo) => {
        updatedTodo.title = req.body.title;
        updatedTodo.save();
        res.send("successfully updated");
        console.log("successfully updated");
        res.status(200).json({ message: "data has been updated successfully" });
      })
      .catch((err) => {
        res.status(400).json({ message: "field is required" });
      });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Todos.findByIdAndRemove(id).exec();
  res.send("successfully deleted");
  console.log("successfully deleted");
});

module.exports = router;
