import express from "express";
import { createDetails, findDetails, getAllDetails, deleteDetail, updateDetail, 
	getApplicationsByPositions, deleteApplications } from "../controllers/applicationController";
import { handleValidations } from "../middleWare/validation";

export const applicationRoutes = express.Router();

applicationRoutes.post('/create-application', handleValidations , createDetails)
applicationRoutes.get('/view-application/:id' , findDetails)
applicationRoutes.get('/view-applications/:page/:pageSize', getAllDetails)
applicationRoutes.delete('/delete-application/:id', deleteDetail)
applicationRoutes.put('/update-application/:id', handleValidations, updateDetail)
applicationRoutes.get('/view-applications/:position',getApplicationsByPositions);
applicationRoutes.delete('/delete-all-applications' , deleteApplications)