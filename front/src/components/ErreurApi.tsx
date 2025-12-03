import { TriangleAlert } from "lucide-react";

export const ErreurApi = ({ message }: any) => {
  return (
    <div className="container">
      <div className="bg-red-300 inline-block p-4 rounded-lg">
        <div className="flex gap-2 ">
          <TriangleAlert />
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};
