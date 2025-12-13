export declare const UserRole: {
    readonly CLIENT: "CLIENT";
    readonly LAWYER: "LAWYER";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
