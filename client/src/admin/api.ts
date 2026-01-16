const API_BASE = import.meta.env.VITE_API_URL ?? '';

const toUrl = (path: string) => `${API_BASE}${path}`;

const request = async (path: string, options?: RequestInit) => {
  const response = await fetch(toUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Error al consultar la API');
  }
  return response.json();
};

export const api = {
  login: (email: string, password: string) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  getProducts: (token: string) =>
    request('/api/products', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getMetrics: (token: string) =>
    request('/api/metrics', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getUsers: (token: string) =>
    request('/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  updateUserRole: (token: string, id: string, role: string) =>
    request(`/api/users/${id}/role`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role }),
    }),
};
