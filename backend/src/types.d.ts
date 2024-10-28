type User = {
    id: string;
    role: string;
    employee_id: string;
    isSupervisor: boolean;
};

declare namespace Express {
    interface Request {
        user?: User;
    }
}