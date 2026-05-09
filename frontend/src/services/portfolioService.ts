import api from './api';
import { AuthResponse, LoginRequest, Project, Certificate, ContactMessage, Skill, Experience } from '../types';

// Auth
export const authService = {
  login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data),
  logout: () => {
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_user');
  },
};

// Projects
export const projectService = {
  getAll: () => api.get<Project[]>('/projects'),
  getById: (id: string) => api.get<Project>(`/projects/${id}`),
  create: (data: Partial<Project>) => api.post<Project>('/projects', data),
  update: (id: string, data: Partial<Project>) => api.put<Project>(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
};

// Certificates
export const certificateService = {
  getAll: () => api.get<Certificate[]>('/certificates'),
  create: (data: Partial<Certificate>) => api.post<Certificate>('/certificates', data),
  delete: (id: string) => api.delete(`/certificates/${id}`),
};

// Contact
export const contactService = {
  send: (data: ContactMessage) => api.post('/contact', data),
  getAll: () => api.get<ContactMessage[]>('/contact'),
  markRead: (id: string) => api.put(`/contact/${id}/read`),
};

// Skills
export const skillService = {
  getAll: () => api.get<Skill[]>('/skills'),
  create: (data: Partial<Skill>) => api.post<Skill>('/skills', data),
  update: (id: string, data: Partial<Skill>) => api.put<Skill>(`/skills/${id}`, data),
  delete: (id: string) => api.delete(`/skills/${id}`),
};

// Experience
export const experienceService = {
  getAll: () => api.get<Experience[]>('/experience'),
  create: (data: Partial<Experience>) => api.post<Experience>('/experience', data),
  update: (id: string, data: Partial<Experience>) => api.put<Experience>(`/experience/${id}`, data),
  delete: (id: string) => api.delete(`/experience/${id}`),
};

export const resumeService = {
  upload: (data: { fileName: string; contentType: string; base64Data: string }) => api.post('/resume/upload', data),
};

