import { createContext, type ReactNode, useContext } from "react";
import { ExperienceService } from "./services/experienceService";

const ServiceContext = createContext<ExperienceService>(
  new ExperienceService()
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

export const useExperienceService = () => {
  const service = useContext(ServiceContext);
  if (!service) throw new Error("ServiceContext not provided");
  return service;
};

export default ServiceContext;
