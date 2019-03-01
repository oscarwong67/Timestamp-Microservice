const throwDateError = (res) => {
  res.json({
      "error": "Invalid Date"
  });
}

module.exports = {
  throwDateError: throwDateError
}