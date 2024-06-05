import Navbar from "@/components/Navbar";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ProfileLayout;
