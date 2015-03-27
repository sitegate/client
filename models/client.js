'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  publicId: {
    type: String,
    unique: true,
    required: true
  },
  secret: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  homepageUrl: {
    type: String,
    unique: true,
    required: true
  },
  authCallbackUrl: {
    type: String,
    unique: true,
    required: true
  },
  trusted: {
    type: Boolean,
    default: false
  }
});

ClientSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Client', ClientSchema);