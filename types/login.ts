
interface LoginResponse {
  user: { id: number; role: { name: string } };
  token: string;
}

export { type LoginResponse };