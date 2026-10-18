export class Technology {
  name!: string;
  description: string | null = null;
  experience: number | null = null;
  // Adds the time spent in the current work experience to the experience
  includeCurrentWork: boolean = false;
}
