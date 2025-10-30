import type { Experience } from "../types/experiencesType";
import AboutCard from "./AboutCard";
import ChooseDate from "./ChooseDate";
import ChooseTime from "./ChooseTime";

const ExperienceInfoCard = ({
  selectedExperience,
}: {
  selectedExperience: Experience | undefined;
}) => {
  if (!selectedExperience) return null;
  return (
    <div className="lg:max-w-[765px] 2xl:max-w-full w-full flex-wrap overflow-hidden flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="font-medium text-2xl">{selectedExperience.title}</h2>
        <p className="text-description">{selectedExperience.description}</p>
      </div>
      <ChooseDate selectedExperience={selectedExperience} />
      <ChooseTime selectedExperience={selectedExperience} />
      <AboutCard />
    </div>
  );
};

export default ExperienceInfoCard;
