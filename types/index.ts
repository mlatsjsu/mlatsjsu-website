export interface WhitelistItem {
  id: string;
  email: string;
}

export interface SpotlightItem {
  id: string;
  title: string;
  images: string[];
  pos: number;
}

export interface BoardItem {
  id: string;
  name: string;
  role: string;
  linkedin: string;
  image: string;
  pos: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  pos: number;
}

export interface LearningResourceItem {
  id: string;
  title: string;
  link: string;
  pos: number;
}
