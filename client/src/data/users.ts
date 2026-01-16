export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator';
}

export const adminUsers: AdminUser[] = [
  {
    id: 'usr-001',
    name: 'Administrador',
    email: 'admin@electrocentro.com',
    role: 'admin'
  },
  {
    id: 'usr-002',
    name: 'Operador Taller',
    email: 'operador@electrocentro.com',
    role: 'operator'
  }
];
