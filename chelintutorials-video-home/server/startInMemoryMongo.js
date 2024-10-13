/* eslint-disable @typescript-eslint/no-require-imports */
// server/startInMemoryMongo.js
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

async function startInMemoryMongoDB() {
  const mongoServer = await MongoMemoryServer.create({
    instance: {
      port: 27018, // Specify the desired port here
    },
  });

  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("In-memory MongoDB started at", uri);

  // Keep the process running
  process.stdin.resume();

  // Clean up on exit
  process.on("SIGINT", async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log("In-memory MongoDB stopped");
    process.exit(0);
  });
}

startInMemoryMongoDB().catch((err) =>
  console.error("Error starting in-memory MongoDB:", err)
);
