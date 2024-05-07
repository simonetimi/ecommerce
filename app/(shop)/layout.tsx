import Header from '@/components/Header';

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default GeneralLayout;
