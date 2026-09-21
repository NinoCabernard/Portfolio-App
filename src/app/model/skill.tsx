export class Skill {
  name!: string;
  description: string | undefined;
  expertiseLevel: ExpertiseLevel = ExpertiseLevel.Beginner;
}

export enum ExpertiseLevel {
  Beginner,
  Intermediate,
  Advanced,
  Expert,
}
