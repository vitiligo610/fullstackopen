export interface HeaderProps {
  name: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpeical extends CoursePartDescription {
  requirements: string[];
  kind: 'special';
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpeical;

export interface ContentProps {
  courseParts: CoursePart[];
}

export interface PartProps {
  part: CoursePart;
}

export interface TotalProps {
  courseParts: CoursePart[];
}
