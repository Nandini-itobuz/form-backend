import express from 'express'
import {
    createApplication,
    findApplication,
    getAllApplications,
    deleteApplication,
    getApplicationsByPositions,
    deleteAllApplications,
} from '../controllers/applicationController'
import { handleValidations } from '../middleWare/validation'


export const applicationRoutes = express.Router()

applicationRoutes.post(
    '/create-application/:id',
    handleValidations,
    createApplication
)
applicationRoutes.get('/view-application/:id', findApplication)
applicationRoutes.get('/view-applications/:page/:pageSize', getAllApplications)
applicationRoutes.delete('/delete-application/:id', deleteApplication)
applicationRoutes.get(
    '/view-applications/:position/:page/:pageSize',
    getApplicationsByPositions
)
applicationRoutes.delete('/delete-all-applications', deleteAllApplications)
