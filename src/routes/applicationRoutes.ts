import express from "express";
import { writeDetails, findDetails, getAllDetails, deleteDetail, updateDetail, 
	getApplicationsByPositions, deleteApplications } from "../controllers/applicationController";

export const applicationRoutes = express.Router();

applicationRoutes.route('/create-application').post(writeDetails)
applicationRoutes.route('/view-application/:id').get(findDetails)
applicationRoutes.route('/view-applications/:page/:pageSize').get(getAllDetails)
applicationRoutes.route('/delete-application/:id').delete(deleteDetail)
applicationRoutes.route('/update-application/:id').put(updateDetail)
applicationRoutes.route('/view-applications/:position').get(getApplicationsByPositions);
applicationRoutes.route('/delete-all-applications').delete(deleteApplications)