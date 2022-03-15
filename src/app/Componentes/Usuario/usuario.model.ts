export interface Usuario {
    id : string,
    userName : string,
    normalizedUserName : string,
    email : string,
    normalizedEmail : string,
    emailConfirmed : boolean,
    passwordHash : string,
    securityStamp : string,
    concurrencyStamp : string,
    phoneNumber : boolean,
    phoneNumberConfirmed : boolean,
    twoFactorEnabled : boolean,
    lockoutEnd : boolean,
    lockoutEnabled : boolean,
    accessFailedCount : number
}
