// src/app/core/models/index.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  idealFor: string[];
  features: string[];
  image: string;
  route: string;
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  route: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  message: string;
  avatar: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  decimals: number;
}

export interface NavItem {
  label: string;
  route?: string;
  children?: { label: string; route: string }[];
}

export interface Resource {
  title: string;
  description: string;
  type: string;
  icon: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface ContactForm {
  name: string;
  organization: string;
  role: string;
  phone: string;
  email: string;
  city: string;
  requirement: string;
  message: string;
}
