const { Schema, model, models } = require("mongoose");

const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 130,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    condition: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: 30,
    },
  },
  { timestamps: true }
);

patientSchema.index({ doctorId: 1, createdAt: -1 });
patientSchema.index({ condition: 1, createdAt: -1 });
patientSchema.index({ createdAt: -1 });

const patientModel = model("Patient", patientSchema);

module.exports = { patientModel }