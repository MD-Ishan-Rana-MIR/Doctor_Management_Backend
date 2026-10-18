
require("dotenv").config();

const app = require("./app");
const connectDB = require("./src/utility/db");

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
