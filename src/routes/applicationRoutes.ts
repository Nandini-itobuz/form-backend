import express from 'express'
import {
    createApplication,
    findApplication,
    getAllApplications,
    deleteApplication,
    updateApplication,
    getApplicationsByPositions,
    deleteAllApplications,
} from '../controllers/applicationController'
import { handleValidations } from '../middleWare/validation'
import { checkEmailExists } from '../middleWare/checkDuplicateEmail'

export const applicationRoutes = express.Router()

applicationRoutes.post(
    '/create-application',
    checkEmailExists,
    handleValidations,
    createApplication
)
applicationRoutes.get('/view-application/:id', findApplication)
applicationRoutes.get('/view-applications/:page/:pageSize', getAllApplications)
applicationRoutes.delete('/delete-application/:id', deleteApplication)
applicationRoutes.put(
    '/update-application/:id/',
    handleValidations,
    updateApplication
)
applicationRoutes.get(
    '/view-applications/:position/:page/:pageSize',
    getApplicationsByPositions
)
applicationRoutes.delete('/delete-all-applications', deleteAllApplications)
