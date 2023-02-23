export interface RegisterForm{
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export interface LoginForm{
    email: string;
    password: string;
}