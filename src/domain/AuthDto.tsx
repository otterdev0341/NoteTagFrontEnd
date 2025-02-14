export interface IRegisterUserData {
    username: string;
    password: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    gender: string;
    email: string;
  }
  
export interface ILoginUserData {
    email: string;
    password: string;
}

export interface IResSignUp{
  msg: string;
}