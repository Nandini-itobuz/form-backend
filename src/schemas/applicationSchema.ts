import mongoose from 'mongoose'
import { JobApplication } from '../interfaces/jobApplication'
import { Position } from '../enums/jobPositionEnum'

const jobApplicationSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, enum: Position, required: true },
    yearsOfExperience: { type: Number, required: true },
    institution: { type: String, required: true },
    degree: { type: String },
    startDate: { type: Date },
    score: { type: Number, required: true },
    status: { type: Boolean, required: true },
})

export const applicationModel = mongoose.model<JobApplication>(
    'job-applications',
    jobApplicationSchema
)
