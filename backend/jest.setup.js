const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

global.beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

global.afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

global.afterEach(async () => {
    await mongoose.connection.dropDatabase();
});
