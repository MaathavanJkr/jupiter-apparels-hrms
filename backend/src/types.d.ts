type User = {
    id: string;
    role: string;
    employee_id: string;
};

declare namespace Express {
    interface Request {
        user?: User;
    }
}