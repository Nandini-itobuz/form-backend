export enum Position{
    FRONTEND_DEVELOPER ='Frontend Developer',
    BACKEND_DEVELOPER = 'Backend Developer',
    QA = 'QA',
    INTERN = 'Intern'
}

export interface JobApplication {
    firstName: string;
    middleName?: string;
    age: number;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate?: string;
    score: number;
    yearsOfExperience: number;
    status: boolean,
}