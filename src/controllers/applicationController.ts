import { Request, Response } from "express";
import { applicationModel } from "../schemas/applicationSchema";
import mongoose from "mongoose";
import { start } from "repl";


const responseData = (res: Response, success: boolean, status: Number, data: any) => {
    res.status(200).json({ data, status, success });
}

export async function writeDetails(req: Request, res: Response): Promise<void> {
    try {
        const newDetails = await applicationModel.create(req.body);
        responseData(res, true, 202, newDetails)
    } catch (err) {
        console.log(err)
        responseData(res, false, 400, null)
    }
}

export async function findDetails(req: Request, res: Response): Promise<void> {
    try {
        const data = await applicationModel.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        responseData(res, true, 202, data)
    } catch (err) {
        responseData(res, false, 400, null)
    }
}

export async function getAllDetails(req: Request, res: Response): Promise<void> {
    try {
        const userDetails = await applicationModel.find();
        const page :number = Number(req.params.page)
        const pageSize :number = Number(req.params.pageSize);
        const startIndex =(page - 1) * pageSize;
        const endIndex = (page) * pageSize;
        const paginatedData = userDetails.slice(startIndex, endIndex);
        const totalPages = Math.ceil(userDetails.length / pageSize);
        const applications = {applicationData : paginatedData ,totalPages:totalPages }
        responseData(res, true, 202, applications)

    } catch (err) {
        responseData(res, false, 400, null)
    }
}

export async function deleteDetail(req: Request, res: Response): Promise<void> {
    try {
        const userDetails = await applicationModel.findByIdAndDelete({ _id: req.params.id });
        responseData(res, true, 202, userDetails)
    } catch (err) {
        responseData(res, false, 400, null)
    }
}

export async function updateDetail(req: Request, res: Response): Promise<void> {
    try {
        const userDetails = await applicationModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
            returnOriginal: false
        });
        responseData(res, true, 202, userDetails)
    } catch (err) {
        responseData(res, false, 400, null)
    }
}

export async function getApplicationsByPositions(req: Request, res: Response): Promise<void> {
    try {
        const applications = await applicationModel.find({ position: req.params.position })
        responseData(res, true, 202, applications)
    } catch (err) {
        responseData(res, false, 400, null)
    }
}

export async function deleteApplications(req: Request, res: Response): Promise<void> {
    try {
        const applications = await applicationModel.deleteMany({});
        responseData(res, true, 202, applications)
    } catch (err) {
        responseData(res, false, 400, null)
    }
}
