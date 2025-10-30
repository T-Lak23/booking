import { useExperienceStore } from "../store/useExperienceStore";
import ExperienceCard from "../components/ExperienceCard";
import Layout from "../components/Layout";
import Loader from "../components/Loader";

const Home = () => {
  const { experiences, loading, error } = useExperienceStore();

  if (loading) return <Loader />;
  return (
    <Layout>
      <div className="lg:px-[124px] lg:py-[135px] px-4 py-[135px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-7">
        {error
          ? error.message
          : experiences?.map((experience) => (
              <ExperienceCard key={experience._id} experience={experience} />
            ))}
      </div>
    </Layout>
  );
};

export default Home;
