import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-main min-h-screen w-full">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
