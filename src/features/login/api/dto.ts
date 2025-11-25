export interface LoginRequestDTO {
  userId: string;
  password: string;
}

export interface LoginResponseDTO {
  accessToken: string;
}
