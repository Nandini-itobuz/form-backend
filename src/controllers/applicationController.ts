import { Request, Response } from "express";
import { applicationModel } from "../schemas/applicationSchema";
import mongoose from "mongoose";


const responseData = (res: Response, statusCode: number) => {
    res.status(200).json({ data: null, status: statusCode, success: false});
}

export async function writeDetails(req: Request, res: Response): Promise<void> {
    try {
        const newDetails = await applicationModel.create(req.body);
        res.status(200).json({ data :newDetails, status : 200, success : true });
    } catch (err) {
        console.log(err)
        responseData(res, 400)
    }
}

export async function findDetails(req: Request, res: Response): Promise<void> {
    try {
        const data = await applicationModel.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        res.status(200).json({ data , status : 200, success : true });
    } catch (err) {
        responseData(res, 400)
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
        res.status(200).json({ data :applications, status : 200, success : true });

    } catch (err) {
        responseData(res, 400)
    }
}

export async function deleteDetail(req: Request, res: Response): Promise<void> {
    try {
        const userDetails = await applicationModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ data :userDetails, status : 200, success : true });
    } catch (err) {
        responseData(res, 400)
    }
}

export async function updateDetail(req: Request, res: Response): Promise<void> {
    try {
        const userDetails = await applicationModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
            returnOriginal: false
        });
        res.status(200).json({ data :userDetails, status : 200, success : true });
    } catch (err) {
        responseData(res, 400)
    }
}

export async function getApplicationsByPositions(req: Request, res: Response): Promise<void> {
    try {
        const applications = await applicationModel.find({ position: req.params.position })
        res.status(200).json({ data :applications, status : 200, success : true });
    } catch (err) {
        responseData(res, 400)
    }
}

export async function deleteApplications(req: Request, res: Response): Promise<void> {
    try {
        const applications = await applicationModel.deleteMany({});
        res.status(200).json({ data :applications, status : 200, success : true });
    } catch (err) {
        responseData(res,400)
    }
}
