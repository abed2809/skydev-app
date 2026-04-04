export interface Project {
  id: string;
  title: string;
  image: string;
  type: 'website' | 'app';
  description?: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  image?: string;
  color: string;
}
