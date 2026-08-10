import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

export enum ChatSender {
  USER = 'user',
  AI = 'ai',
  SYSTEM = 'system'
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: ChatSender;
  timestamp: Date;
}