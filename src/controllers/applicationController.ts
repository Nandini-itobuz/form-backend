import { Request, Response, NextFunction } from 'express'
import { applicationModel } from '../schemas/applicationSchema'
import { StatusCodes } from '../enums/statusCodes'
import mongoose from 'mongoose'
import { handleErrorResponse } from '../helper/handleErrorResponse'

export async function createApplication(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
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

export async function findApplication(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const application = await applicationModel.findOne({
            _id: new mongoose.Types.ObjectId(req.params.id),
        })
        if (!application) {
            handleErrorResponse({
                res,
                code: StatusCodes.GATEWAY_TIMEOUT,
                message: 'Application not found',
            })
        }
        res.status(StatusCodes.SUCCESS).json({
            application,
            status: 200,
            success: true,
            message: 'Application found successfully',
        })
    } catch (err) {
        next(err)
    }
}

export async function getAllApplications(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
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

export async function deleteApplication(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const applicationDetails = await applicationModel.findByIdAndDelete({
            _id: req.params.id,
        })
        if (!applicationDetails) {
            handleErrorResponse({
                res,
                code: StatusCodes.NOT_FOUND,
                message: 'Unable to delete application!',
            })
        }
        res.status(StatusCodes.SUCCESS).json({
            data: applicationDetails,
            success: true,
            message: 'Application deleted successfully',
        })
    } catch (err) {
        next(err)
    }
}

export async function updateApplication(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const application = await applicationModel.findOne({
            _id: new mongoose.Types.ObjectId(req.params.id),
        })
        if (!application) {
            handleErrorResponse({
                res,
                code: StatusCodes.NOT_FOUND,
                message: 'Unable to edit application',
            })
        }
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
            message: 'Application updated successfully',
        })
    } catch (err) {
        next(err)
    }
}

export async function getApplicationsByPositions(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
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
                edit: 'edit',
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

export async function deleteAllApplications(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
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
