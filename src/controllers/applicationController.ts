import { RequestHandler } from 'express'
import { applicationModel } from '../schemas/applicationSchema'
import { StatusCodes } from '../enums/statusCodes'
import mongoose, { mongo } from 'mongoose'
import { Position } from '../enums/jobPositionEnum'

class applicationClass {
    public createApplication: RequestHandler = async (req, res, next) => {
        try {
            const id = req.body._id ?? new mongoose.Types.ObjectId()
            const newApplication = await applicationModel.findByIdAndUpdate(
                { _id: id },
                req.body,
                { new: true, upsert: true }
            )
            res.status(StatusCodes.CREATED).json({
                data: newApplication,
                status: true,
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
                data: application,
                status: true,
                message: `${application ? 'Application found successfully' : 'No applications found'}`,
            })
        } catch (err) {
            next(err)
        }
    }

    public deleteApplication: RequestHandler = async (req, res, next) => {
        try {
            const filter = req.body.id ? { _id: req.body.id } : {}
            const applicationDetails = await applicationModel.deleteMany(filter)
            res.status(StatusCodes.SUCCESS).json({
                data: applicationDetails,
                status: true,
                message: `${req.body.id ? 'Application deleted successfully' : 'All applications deleted successfully'}`,
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
            const filter =
                req.params.position != Position.ALL
                    ? { position: req.params.position }
                    : {}
            const totalApplications =
                await applicationModel.countDocuments(filter)
            const applicationsPaginated = await applicationModel
                .find(filter)
                .skip((page - 1) * pageSize)
                .limit(pageSize)
            res.status(StatusCodes.SUCCESS).json({
                data: {
                    applicationData: applicationsPaginated,
                    totalPages: Math.ceil(totalApplications / pageSize),
                },
                status: true,
                message: 'Applications found successfully',
            })
        } catch (err) {
            next(err)
        }
    }

    public handleSeachItems: RequestHandler = async (req, res, next) => {
        try {
            const filter =
                req.params.position != Position.ALL
                    ? { position: req.params.position }
                    : {}
            const filteredItems = await applicationModel.find({
                ...filter,
                $or: [
                    { firstName: { $regex: req.body.name, $options: 'i' } },
                    { lastName: { $regex: req.body.name, $options: 'i' } },
                    { position: { $regex: req.body.name, $options: 'i' } },
                ],
            })
            res.status(StatusCodes.SUCCESS).json({
                status: true,
                message: 'Applications successfully found',
                data: { applications: filteredItems },
            })
        } catch (e) {
            next(e)
        }
    }
}

export const applicationService = new applicationClass()
