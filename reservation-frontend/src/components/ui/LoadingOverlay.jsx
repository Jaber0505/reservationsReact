const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
      <p className="text-white mt-4">Veuillez patienter...</p>
    </div>
  );
};

export default LoadingOverlay;
