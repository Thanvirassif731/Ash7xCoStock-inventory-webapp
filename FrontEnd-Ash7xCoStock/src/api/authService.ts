type LoginPayload = { email: string; password: string; name?: string };

const MOCK_EMAIL = "admin@costock.com";
const MOCK_PASSWORD = "Admin@123";

export const login = (payload: LoginPayload): Promise<{ accessToken: string; user: { email: string } }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.email === MOCK_EMAIL && payload.password === MOCK_PASSWORD) {
        const token = "mocked-jwt-token-12345";
        // store token for PrivateRoute
        localStorage.setItem("token", token);
        localStorage.setItem("email", payload.email);
        resolve({ accessToken: token, user: { email: payload.email } });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 500);
  });
};

export const register = (payload: LoginPayload): Promise<{ accessToken: string; user: { email: string } }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const token = "mocked-jwt-token-registered-67890";
      localStorage.setItem("token", token);
      localStorage.setItem("email", payload.email || "user@local");
      resolve({ accessToken: token, user: { email: payload.email || "user@local" } });
    }, 700);
  });
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
};
