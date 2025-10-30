import { Link } from "react-router";
import type { Experience } from "../types/experiencesType";
import Button from "./Button";

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <div className="rounded-xl overflow-hidden min-h-[312px] bg-card flex flex-col">
      <img
        className="h-[170px] object-cover w-full rounded-t-xl"
        src={experience.image}
        alt={experience.title}
      />
      <div className="py-3 px-4 flex flex-col justify-between flex-1 gap-5">
        <div className="flex items-center justify-between ">
          <p className="text-[16px] font-medium">{experience.title}</p>
          <Button
            text={experience.location}
            className="py-1 px-2 rounded-sm text-[11px] bg-secondary-button"
          />
        </div>
        <div className="text-description font-normal">
          {experience.description}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-normal">From</span>
            <span className="font-medium text-xl">{experience.price}</span>
          </div>
          <Link to={`/${experience._id}`}>
            {" "}
            <Button
              text="View Details"
              className="px-2 py-1.5 rounded-sm bg-button"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
