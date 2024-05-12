export type GenericObject = {
  [key: string]: any
};

export const getObjectFromFormData = (schema: GenericObject[], formData: FormData) => {
  const body: GenericObject = {};
  schema.forEach(fs => {
    body[fs.name] = formData.get(fs.name);
  });
  return body;
}

export interface HomeContent {
  id: number;
  greeting: string;
  imageUrl: string;
  quote: string;
  about: string;
}

export interface IntroductionContent {
  id: number;
  name: string;
  imageUrl: string;
  phone: string;
  email: string;
  location: string;
  dob: string;
}

export interface Experience {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  techStack: string[];
}

export interface CaseStudy {
  id: number;
  title: string;
  description: string;
  body: string;
  slug: string;
}