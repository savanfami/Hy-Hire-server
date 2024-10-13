


export interface UserEntity {
    _id?: string,
    name?: string,
    email?: string,
    password?: string,
    image?: string
    location?: string,
    role?: 'user' | 'admin' | 'company',
    phone?: number;
    aboutMe?: string;
    isBlocked?: boolean,
    skills?: string[],
    experiences?: {
        working: string;
        title: string,
        description: string,
        startDate: string,
        year: { from: Date, to: Date },
    }[],
    socialLinks?: [{ platform: string, url: string }],
    education?: {
        university: string
        course: string;
        description: string;
        year:{from:Date,to:Date} 
    }[],
    profileCompleted?: boolean;
    resumes?:string[];
    savedJobs?: string[],
    certificates?:[
        {
          certificateName:string,
          issuingOrganization:string,
          certificateImage:string
        }
      ]
}