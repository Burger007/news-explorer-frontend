const STUB_USER = {
  _id: "65f7368dfb74bd6a92114c80",
  name: "Elise",
  email: "elise@example.com",
};

export function register(email, password, name) {
  if (!email || !password || !name) {
    return Promise.reject(new Error("Missing fields"));
  }
  return Promise.resolve({ date: { _id: STUB_USER._id, email, name } });
}

export function authorize(email, password) {
  if (!email || !password) {
    return Promise.reject(new Error("Missing fields"));
  }
  return Promise.resolve({ token: "a-fake-jwt-token" });
}

export function checkToken(token) {
  if (!token) return Promise.reject(new Error("No token"));
  return Promise.resolve({ data: STUB_USER });
}
