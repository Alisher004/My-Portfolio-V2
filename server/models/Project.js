import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    tech: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const Project = mongoose.model('Project', projectSchema)
