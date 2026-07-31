import { register } from "../api/auth";
import { login } from "../api/auth";
import type { RegisterRequest } from "../types/auth.types";
import type { LoginRequest } from "../types/auth.types";

export class AuthService {
  private IsNamesValid(name: string): boolean {
    return name !== null && name !== "" && name.length >= 2;
  }

  private IsPasswordEqual(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

  public async register(data: RegisterRequest) {
    if (!this.IsPasswordEqual(data.password, data.confirmPassword)) {
      throw new Error("Passwords do not match");
    }

    if (!this.IsNamesValid(data.name) || !this.IsNamesValid(data.surname)) {
      throw new Error("Entered name and surname are invalid!");
    }

    const requestData: RegisterRequest = {
      role: data.role,
      name: data.name,
      surname: data.surname,
      password: data.password,
      confirmPassword: data.confirmPassword,
      email: data.email,
    };

    const response = await register(requestData);

    return response;
  }

  public async login(data: LoginRequest) {
    const requestData: LoginRequest ={
        email: data.email,
        password: data.password,
    };
    
    const response = await login(requestData);
    return response;
  }
}

export const authService = new AuthService();
