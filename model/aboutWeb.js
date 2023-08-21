const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  domain: { type: String, required: true, unique: true },
  creationDate: { type: Date, default: Date.now },
  owner: { type: String },
  categories: [{ type: String }],
  languages: [{ type: String }],
  socialMedia: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    youtube: { type: String }
  },
  contact: {
    email: { type: String },
    phone: { type: String }
  },
  location: {
    country: { type: String },
    city: { type: String },
    address: { type: String }
  },
  analyticsCode: { type: String },
  isActive: { type: Boolean, default: true }
});

const Website = mongoose.model("Website", websiteSchema);

module.exports = Website;
