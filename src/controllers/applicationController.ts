import { Request, Response, NextFunction } from "express";
import { applicationModel } from "../schemas/applicationSchema";
import { StatusCodes } from "../enums/statusCodes";
import mongoose from "mongoose";
import { handleErrorResponse } from "../helper/handleErrorResponse";


export async function createDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const newDetails = await applicationModel.create(req.body);
        res.status(StatusCodes.CREATED).json({ data: newDetails, success: true, message: 'Data added successfully' });
    } catch (err) {
        next(err)
    }
}

export async function findDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const data = await applicationModel.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        if (!data) { handleErrorResponse(res, StatusCodes.GATEWAT_TIMEOUT, `Data not found`) }
        res.status(StatusCodes.SUCCESS).json({ data, status: 200, success: true, message: `Data found successfully` });
    } catch (err) {
        next(err)
    }
}

export async function getAllDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userDetails = await applicationModel.find();
        const page: number = Number(req.params.page)
        const pageSize: number = Number(req.params.pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = (page) * pageSize;
        const paginatedData = userDetails.slice(startIndex, endIndex);
        const totalPages = Math.ceil(userDetails.length / pageSize);
        const applications = { applicationData: paginatedData, totalPages: totalPages }
        res.status(StatusCodes.SUCCESS).json({ data: applications, success: true, message: `Data found successfully` });
    } catch (err) {
        next(err)
    }
}

export async function deleteDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userDetails = await applicationModel.findByIdAndDelete({ _id: req.params.id });
        if (!userDetails) { handleErrorResponse(res, StatusCodes.NOT_FOUND, `Unable to delete data!`) }
        res.status(StatusCodes.SUCCESS).json({ data: userDetails, success: true, message: `Data deleted successfully` });
    } catch (err) {
        next(err)
    }
}

export async function updateDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const data = await applicationModel.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        if (!data) { handleErrorResponse(res, StatusCodes.NOT_FOUND, `Unable to edit data`) }
        const userDetails = await applicationModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
            returnOriginal: false
        });
        res.status(StatusCodes.SUCCESS).json({ data: userDetails, success: true, message: `Data updated successfully` });
    } catch (err) {
        next(err)
    }
}

export async function getApplicationsByPositions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const applications = await applicationModel.find({ position: req.params.position })
        res.status(200).json({ data: applications, status: 200, success: true });
    } catch (err) {
        next(err)
    }
}

export async function deleteApplications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const applications = await applicationModel.deleteMany({});
         applications.deletedCount ? 
        res.status(200).json({ data: applications, status: 200, success: true }) :
        handleErrorResponse(res, StatusCodes.NO_CONTENT, `Nothing to delete`)
    } catch (err) {
        next(err)
    }
}
