import {} from 'mongoose'

export interface UserEntity {
    _id?: string,
    name?: string,
    email?: string,
    password?: string,
    role?: 'user' | 'admin' | 'company',
    phoneNumber?: number,
    isBlocked?: boolean,
    resume?: string,
    skills?: string[],
    experiences?: {
        title: string,
        description: string,
        image: string,
        location: string,
    }[],
    personalsite?: string,
    socialLink?: string[],
    coverImage?: string,
    icon?: string,
    location?: string,
    about?: string,
    education?: {
        university: string; 
        course: string;
        year: { from: Date; to: Date };
        description: string;
    }[],
    profileCompleted?: boolean
    dateofbirth?: Date,
    currengDesignation?: String,
    resumes?: string[],
    stage?: string,
    savedJobs?: string[],
    certification?:{title:string,file:string}[]
}