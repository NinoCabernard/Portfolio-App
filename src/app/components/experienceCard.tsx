import { motion } from "framer-motion";
import type { ReactElement } from "react";
import React from "react";
import type { Work } from "~/model/work";

// Helper: convert date to timestamp
const toTimestamp = (date: string | Date): number => new Date(date).getTime();

interface ExperienceCardProps {
  start: string | Date;
  end: string | Date;
  workExperience: Work;
}

// Timeline component
export default function ExperienceCard(props: ExperienceCardProps) {
  return (
    <div>
      <h2>{`${props.workExperience.role} at ${props.workExperience.company}`}</h2>

      <ul></ul>
    </div>
  );
}