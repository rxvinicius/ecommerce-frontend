export type LoginDTO = {
  email: string;
  password: string;
};

export type SignupDTO = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
};
