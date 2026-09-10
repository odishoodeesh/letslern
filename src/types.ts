export type NewsItem = {
  id: string;
  title: string;
  date: string;
  summary: string;
  imageUrl?: string;
};

export type AcademicDepartment = {
  id: string;
  name: string;
  description: string;
  icon?: string;
};

export type ScheduleItem = { id: string, day: string, time: string, activity: string };

export type PageSection = {
  id: string;
  title: string;
  imageUrl?: string;
  content: string;
  type?: 'text' | 'schedule';
  scheduleItems?: ScheduleItem[];
};

export type Page = {
  id: string;
  name: string;
  sections: PageSection[];
};

export type LanguageOffer = {
  id: string;
  name: string;
  native: string;
  code: string;
  description: string;
  levels: string;
  focus: string[];
};

export type SkillsTrainingModule = {
  id: string;
  title: string;
  description: string;
  points: string[];
};

export type LanguageArticle = {
  id: string;
  title: string;
  languages: string;
  summary: string;
  content: string;
};

export type MissionSlogan = {
  id: string;
  quote: string;
  context: string;
  description: string;
};

export type MissionPillar = {
  id: string;
  title: string;
  badge: string;
  description: string;
  points: string[];
};

export type AboutUsData = {
  intro: string;
  phoneNumbers: string[];
  address: string;
  instagramUrl: string;
  mapEmbedUrl: string;
};

export type BucketImage = {
  name: string;
  path: string;
  url: string;
  size: number;
  updatedAt: string;
};
