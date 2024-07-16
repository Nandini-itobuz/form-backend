import { Request, Response, NextFunction, RequestHandler } from 'express'
import { applicationModel } from '../schemas/applicationSchema'
import { StatusCodes } from '../enums/statusCodes'
import mongoose from 'mongoose'
import { handleErrorResponse } from '../helper/handleErrorResponse'

export const createApplication: RequestHandler = async (req, res, next) => {
    try {
        const newApplication = await applicationModel.create(req.body)
        res.status(StatusCodes.CREATED).json({
            data: newApplication,
            success: true,
            message: 'Application added successfully',
        })
    } catch (err) {
        next(err)
    }
}

export const findApplication: RequestHandler = async (req, res, next) => {
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

export const getAllApplications: RequestHandler = async (req, res, next) => {
    try {
        const page: number = Number(req.params.page)
        const pageSize: number = Number(req.params.pageSize)
        const totalApplications = await applicationModel.countDocuments({})
        const applicationsPaginated = await applicationModel
            .find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
        const totalPages = Math.ceil(totalApplications / pageSize)
        const applications = {
            applicationData: applicationsPaginated,
            totalPages,
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

export const deleteApplication: RequestHandler = async (req, res, next) => {
    try {
        const applicationDetails = await applicationModel.findByIdAndDelete({
            _id: req.params.id,
        })

        res.status(StatusCodes.SUCCESS).json({
            data: applicationDetails,
            success: true,
            message: `{${applicationDetails ? 'Application deleted successfully' : 'No applications found'}`,
        })
    } catch (err) {
        next(err)
    }
}

export const updateApplication: RequestHandler = async (req, res, next) => {
    try {
        const application = await applicationModel.findOne({
            _id: new mongoose.Types.ObjectId(req.params.id),
        })
        const applicationDetails = await applicationModel.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                returnOriginal: false,
            }
        )
        res.status(StatusCodes.SUCCESS).json({
            data: applicationDetails,
            success: true,
            message: `${application ? 'Application edited successfully' : 'Unable to edit application'}`,
        })
    } catch (err) {
        next(err)
    }
}

export const getApplicationsByPositions: RequestHandler = async (
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
        const totalPages = Math.ceil(totalApplications / pageSize)
        res.status(StatusCodes.SUCCESS).json({
            data: {
                applicationData: applicationsPaginated,
                totalPages,
            },
            success: true,
            message: 'Application found successfully',
        })
    } catch (err) {
        next(err)
    }
}

export const deleteAllApplications: RequestHandler = async (req, res, next) => {
    try {
        const applications = await applicationModel.deleteMany({})
        applications.deletedCount
            ? res.status(StatusCodes.SUCCESS).json({
                  data: applications,
                  success: true,
                  message: 'Applications deleted successfully',
              })
            : handleErrorResponse({
                  res,
                  code: StatusCodes.NO_CONTENT,
                  message: `Nothing to delete`,
              })
    } catch (err) {
        next(err)
    }
}
