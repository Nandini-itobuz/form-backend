import express from 'express'
import { applicationService } from '../controllers/applicationController'
import { handleValidations } from '../middleWare/validation'

export const applicationRoutes = express.Router()

applicationRoutes.post(
    '/create-application/:id',
    handleValidations,
    applicationService.createApplication
)
applicationRoutes.get(
    '/view-application/:id',
    applicationService.findApplication
)
applicationRoutes.get(
    '/view-applications/:page/:pageSize',
    applicationService.getAllApplications
)
applicationRoutes.post(
    '/delete-application',
    applicationService.deleteApplication
)
applicationRoutes.get(
    '/view-applications/:position/:page/:pageSize',
    applicationService.getApplicationsByPositions
)
