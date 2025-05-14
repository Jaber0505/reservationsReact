const CenteredContainer = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="-translate-y-20">
        {children}
      </div>
    </div>
  );
};

export default CenteredContainer;
