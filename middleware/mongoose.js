const mongoose = require("mongoose");

const connectDb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  await mongoose.connect("mongodb+srv://zbytes1:yvnwXhOgOl6p44FS@cluster0.45jhcsq.mongodb.net/aim?retryWrites=true&w=majority");
  return handler(req, res);
};
export default connectDb;