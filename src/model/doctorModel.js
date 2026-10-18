const { Schema, model, models } = require("mongoose");

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 120,
    },

    specialization: {
      type: String,
      required: [true, "Specialization is required"],
      trim: true,
      maxlength: 120,
    },

    hospital: {
      type: String,
      required: [true, "Hospital is required"],
      trim: true,
      maxlength: 200,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: 30,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Additional indexes
doctorSchema.index({ specialization: 1, createdAt: -1 });
doctorSchema.index({ createdAt: -1 });

const Doctor = models.Doctor || model("Doctor", doctorSchema);

module.exports = Doctor;