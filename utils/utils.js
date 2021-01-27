const handleError = (err, res) => {
  if (err.name === 'ValidationError') {
    const error = Object.values(err.errors).reduce((prev, item) => {
      const clone = prev;
      clone[item.path] = item.message;
      return clone;
    }, {});
    return res.status(400).send(error);
  }
  return res.status(500).send({ message: err.name });
};

module.exports = {
  handleError,
};
