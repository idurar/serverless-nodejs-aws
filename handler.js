"use strict";

require("dotenv").config({ path: "./variables.env" });
const connectToDatabase = require("./db");
const Customer = require("./models/Customer");

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() => Customer.create(JSON.parse(event.body)))
    .then((customer) =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(customer),
      })
    )
    .catch((err) =>
      // console.log(err),
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not create the Customer.",
      })
    );
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() => Customer.findById(event.pathParameters.id))
    .then((customer) =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(customer),
      })
    )
    .catch((err) =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not fetch the Customer.",
      })
    );
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() => Customer.find())
    .then((customers) =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(customers),
      })
    )
    .catch((err) =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not fetch the customers.",
      })
    );
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      Customer.findByIdAndUpdate(
        event.pathParameters.id,
        JSON.parse(event.body),
        { new: true }
      )
    )
    .then((customer) =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(customer),
      })
    )
    .catch((err) =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not fetch the customers.",
      })
    );
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() => Customer.findByIdAndRemove(event.pathParameters.id))
    .then((customer) =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Removed note with id: " + customer._id,
          customer: customer,
        }),
      })
    )
    .catch((err) =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not fetch the customers.",
      })
    );
};
