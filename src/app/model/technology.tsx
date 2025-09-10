export class Technology {
  name!: string;
  description: string | null = null;
  experience: number | null = null;
  imgUrl: string | undefined;
  epxertiseLevel: ExpertiseLevel | undefined;
}

export enum ExpertiseLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Expert = "Expert",
}
