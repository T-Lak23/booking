import { useState, createContext, useContext, useEffect } from "react";
import type { Experience } from "../types/experiencesType";
import { API } from "../config/api";

export const ExperienceContext = createContext<{
  experiences: Experience[];
  getExperiences: (search?: string) => Promise<void>;
  loading: boolean;
  error: any;
  query: string;
  setQuery: (val: string) => void;
  selectedExperience: Experience | undefined;
  setSelectedExperience: (val: Experience) => void;
  getOneExperience: (id: string) => Promise<void>;
  experienceLoading: boolean;
  experienceError: any;
} | null>(null);

export const ExperienceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [experienceLoading, setExperienceLoading] = useState<boolean>(false);
  const [error, setError] = useState<null>();
  const [experienceError, setExperienceError] = useState<any>(null);
  const [selectedExperience, setSelectedExperience] = useState<
    Experience | undefined
  >();

  useEffect(() => {
    const interval = setTimeout(() => {
      setDebouncedQuery(query);
    }, 600);
    return () => {
      clearInterval(interval);
    };
  }, [query]);
  useEffect(() => {
    getExperiences(debouncedQuery);
  }, [debouncedQuery]);

  const getExperiences = async (search?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get("/experiences", {
        params: search ? { search } : {},
      });
      setExperiences(response.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getOneExperience = async (id: string) => {
    setExperienceLoading(true);
    setExperienceError(null);
    try {
      const response = await API.get(`/experiences/${id}`);
      setSelectedExperience(response.data);
    } catch (error) {
      setExperienceError(error);
    } finally {
      setExperienceLoading(false);
    }
  };

  return (
    <ExperienceContext.Provider
      value={{
        experiences,
        getExperiences,
        loading,
        error,
        query,
        setQuery,
        selectedExperience,
        setSelectedExperience,
        getOneExperience,
        experienceLoading,
        experienceError,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperienceStore = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error(
      "useExperienceStore must be used within an ExperienceProvider"
    );
  }
  return context;
};
