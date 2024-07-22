import { RequestHandler } from 'express'
import { applicationModel } from '../schemas/applicationSchema'
import { StatusCodes } from '../enums/statusCodes'
import mongoose, { mongo } from 'mongoose'

class applicationClass {
    public createApplication: RequestHandler = async (req, res, next) => {
        try {
            const id = req.body._id
                ? req.body._id
                : new mongoose.Types.ObjectId()
            const newApplication = await applicationModel.findByIdAndUpdate(
                { _id: id },
                req.body,
                { new: true, upsert: true }
            )
            res.status(StatusCodes.CREATED).json({
                data: newApplication,
                success: true,
                message: `${newApplication ? 'Application edited successfully' : 'Unable to edit application'}`,
            })
        } catch (err) {
            next(err)
        }
    }

    public findApplication: RequestHandler = async (req, res, next) => {
        try {
            const application = await applicationModel.findOne({
                _id: new mongoose.Types.ObjectId(req.params.id),
            })
            res.status(StatusCodes.SUCCESS).json({
                application,
                success: true,
                message: `${application ? 'Application found successfully' : 'No applications found'}`,
            })
        } catch (err) {
            next(err)
        }
    }

    public getAllApplications: RequestHandler = async (req, res, next) => {
        try {
            const page: number = Number(req.params.page)
            const pageSize: number = Number(req.params.pageSize)
            const totalApplications = await applicationModel.countDocuments({})
            const applicationsPaginated = await applicationModel
                .find()
                .skip((page - 1) * pageSize)
                .limit(pageSize)
            const applications = {
                applicationData: applicationsPaginated,
                totalPages: Math.ceil(totalApplications / pageSize),
            }
            res.status(StatusCodes.SUCCESS).json({
                data: applications,
                success: true,
                message: 'Application found successfully',
            })
        } catch (err) {
            next(err)
        }
    }

    public deleteApplication: RequestHandler = async (req, res, next) => {
        try {
            const id = req.body.id ?? null
            const filter = id ? { _id: id } : {}
            const applicationDetails = await applicationModel.deleteMany(filter)
            res.status(StatusCodes.SUCCESS).json({
                data: applicationDetails,
                success: true,
                message: `${id ? 'Application deleted successfully' : 'All applications deleted successfully'}`,
            })
        } catch (err) {
            next(err)
        }
    }

    public getApplicationsByPositions: RequestHandler = async (
        req,
        res,
        next
    ) => {
        try {
            const page: number = Number(req.params.page)
            const pageSize: number = Number(req.params.pageSize)
            const totalApplications = await applicationModel.countDocuments({
                position: req.params.position,
            })
            const applicationsPaginated = await applicationModel
                .find({
                    position: req.params.position,
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
            res.status(StatusCodes.SUCCESS).json({
                data: {
                    applicationData: applicationsPaginated,
                    totalPages: Math.ceil(totalApplications / pageSize),
                },
                success: true,
                message: 'Applications found successfully',
            })
        } catch (err) {
            next(err)
        }
    }
}

export const applicationService = new applicationClass()
