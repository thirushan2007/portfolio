export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  githubLink?: string;
  demoLink?: string;
  imageUrl?: string;
  category: string;
  featured?: boolean;
  createdAt?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  imageUrl?: string;
  description?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: string;
  read?: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  username: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface Skill {
  id?: string;
  name: string;
  icon?: string;
  category: string;
  color: string;
  bg?: string;
  order?: number;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  grade?: string;
  description?: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
