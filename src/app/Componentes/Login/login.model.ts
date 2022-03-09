

export interface Login {
    id : string,
    userName : string,
    normalizedUserName : string,
    email : string,
    normalizedEmail : string,
    emailConfirmed : string,
    passwordHash : string,
    securityStamp : string,
    concurrencyStamp : string,
    phoneNumber : string,
    phoneNumberConfirmed : boolean,
    twoFactorEnabled : boolean,
    lockoutEnd : boolean,
    lockoutEnabled : boolean,
    accessFailedCount : number
}
