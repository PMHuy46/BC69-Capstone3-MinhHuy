import { Banner } from "../Components";
import { HomeTemplate } from "../Components/templates/HomeTemplate";

export const Home = () => {
  return (
    <div>
      <Banner />
      <div className="mx-[80px]">
        <HomeTemplate />
      </div>
    </div>
  );
};
