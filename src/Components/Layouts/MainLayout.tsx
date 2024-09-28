import { Footer, Header } from "../ui";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <main className="my-[80px] " >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
