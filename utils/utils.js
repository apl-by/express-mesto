const handleValidationError = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    const error = Object.values(err.errors).reduce((prev, item) => {
      const clone = prev;
      clone[item.path] = item.message;
      return clone;
    }, {});
    return res.status(400).send(error);
  }
  return res.status(500).send({ message: err.message });
};

const handleSearchError = (err, res, message) => {
  if (err.name === 'CastError' || err.name === 'DocumentNotFoundError') {
    return res.status(404).send(message);
  }
  return res.status(500).send({ message: err.message });
};

module.exports = {
  handleValidationError, handleSearchError,
};
