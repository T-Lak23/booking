import { useParams } from "react-router";
import Layout from "../components/Layout";
import { useExperienceStore } from "../store/useExperienceStore";
import { useEffect } from "react";
import GoBack from "../components/GoBack";
import ExperienceInfoCard from "../components/ExperienceInfoCard";
import CartTotal from "../components/CartTotal";
import Loader from "../components/Loader";

const Experience = () => {
  const {
    getOneExperience,
    selectedExperience,
    experienceLoading,
    experienceError,
  } = useExperienceStore();
  const { id } = useParams();

  useEffect(() => {
    const fetchExperience = async () => {
      await getOneExperience(id!);
    };
    fetchExperience();
  }, []);

  return (
    <Layout>
      {experienceLoading ? (
        <Loader />
      ) : experienceError ? (
        experienceError.message
      ) : (
        <>
          <div className="lg:px-[124px] lg:py-[155px] px-4 sm:py-[190px] py-[230px] mx-auto">
            <GoBack to="/" text="Details" />
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <img
                  className="w-full lg:max-w-[765px] 2xl:max-w-full max-h-[381px] object-cover rounded-xl mb-6"
                  src={selectedExperience?.image}
                  alt={selectedExperience?.title}
                />
                <ExperienceInfoCard selectedExperience={selectedExperience} />
              </div>

              <div className="w-full lg:max-w-[387px]">
                <CartTotal selectedExperience={selectedExperience} />
              </div>
            </div>
          </div>
        </>
      )}{" "}
    </Layout>
  );
};

export default Experience;
