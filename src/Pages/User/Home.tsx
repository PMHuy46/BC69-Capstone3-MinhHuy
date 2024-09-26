import { Banner, HomeTemplate } from "../../Components";

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
