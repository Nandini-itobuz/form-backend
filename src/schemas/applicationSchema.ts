import mongoose from 'mongoose'
import { JobApplication } from '../interfaces/jobApplication'
import { Position } from '../enums/jobPositionEnum'

const jobApplicationSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, 'this field is required'] },
    middleName: { type: String },
    lastName: { type: String, required: [true, 'this field is required'] },
    age: { type: Number, required: [true, 'this field is required'] },
    email: { type: String, required: [true, 'this field is required'] },
    phone: { type: String, required: [true, 'this field is required'] },
    position: {
        type: String,
        enum: Position,
        required: [true, 'this field is required'],
    },
    yearsOfExperience: {
        type: Number,
        required: [true, 'this field is required'],
    },
    institution: { type: String, required: [true, 'this field is required'] },
    degree: { type: String },
    startDate: { type: Date },
    score: { type: Number, required: [true, 'this field is required'] },
    status: { type: Boolean, required: [true, 'this field is required'] },
})

export const applicationModel = mongoose.model<JobApplication>(
    'job-applications',
    jobApplicationSchema
)
