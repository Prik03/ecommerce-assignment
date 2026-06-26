const Skeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 animate-pulse w-full h-full flex flex-col">
      <div className="w-full h-56 bg-gray-200 rounded-md" />

      <div className="h-6 bg-gray-200 rounded mt-4 w-3/4" />

      <div className="flex items-center justify-between mt-4">
        <div className="h-6 bg-gray-200 rounded w-20" />

        <div className="h-6 bg-gray-200 rounded w-24" />
      </div>
    </div>
  );
};

export default Skeleton;
