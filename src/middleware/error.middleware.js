const mongoose = require("mongoose")
 const notFound = (_req, res) => {
  res.status(404).json({ message: "API route not found" });
};

const errorHandler = (
  error,
  _req,
  res,
  _next
) => {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      message: "Validation failed",
      errors: Object.values(error.errors).map((e) => e.message),
    });
    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: "Invalid resource ID" });
    return;
  }

  if (error?.code === 11000) {
    res.status(409).json({
      message: "A record with this unique value already exists",
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    message: "Internal server error",
  });
};


module.exports = {
  notFound,errorHandler
}