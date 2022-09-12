// Middleware for retrieving data from collection by ID by passing model as argument
const getById = (model) => {
  return async (req, res) => {
    try {
      await model.find({ _id: req.params.id }).then((data) => {
        res.json(data);
      });
    } catch (err) {
      res.status(403).json({ message: "Please use valid id" });
    }
  };
};

module.exports = getById;
