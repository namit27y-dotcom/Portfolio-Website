export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  details?: string;
  metrics?: { label: string; value: string }[];
  accentColor?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  accentColor?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: "Frontend" | "Programming" | "Backend" | "Dev Tools" | "Future Learning";
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

