const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const numberRegexp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const contactAddSchema = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegexp),
  phone: Joi.string().required().pattern(numberRegexp),
  favorite: Joi.boolean(),
  createdAt: Joi.string(),
  updatedAt: Joi.string(),
});

const updateFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contacts", contactSchema);

module.exports = {
  Contact,
  contactAddSchema,
  updateFavoriteContactSchema,
};
