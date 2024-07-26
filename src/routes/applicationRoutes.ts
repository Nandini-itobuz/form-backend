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
applicationRoutes.post(
    '/delete-application',
    applicationService.deleteApplication
)
applicationRoutes.get(
    '/view-applications/:position/:page/:pageSize',
    applicationService.getApplicationsByPositions
)
applicationRoutes.post(
    '/search-applications/:position',
    applicationService.handleSeachItems
)
