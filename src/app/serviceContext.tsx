import { createContext, type ReactNode } from "react";
import { ExperienceService } from "./services/experienceService";

const ServiceContext = createContext<ExperienceService>(
  {} as ExperienceService
);

interface ServiceProviderProps {
  children: ReactNode;
}

export const ServiceProvider = ({ children }: ServiceProviderProps) => {
  const service = new ExperienceService();
  return (
    <ServiceContext.Provider value={service}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceContext;
