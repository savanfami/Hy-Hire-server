import { UserEntity } from "domain/entity";

export enum Roles{
    User='user',
    Admin='admin',
    Company='company'
}

export interface IsearchUser{
    search:string;
    page:string|number;
}


export interface getAllUserResponse {
    data:UserEntity[],
    itemsPerPage:number,
    totalPages:number,
    totalItems:number
}