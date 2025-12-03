import { ErreurApi } from "@/components/ErreurApi";
import ToolCard from "@/components/ToolCard";
import { useTools } from "@/hooks/useTools";

const Tools = () => {
  const { tools, error, loading } = useTools();
  if (loading) return <div className="container p-8">Chargement...</div>;
  if (error) return <ErreurApi message={error.message} />;
  return (
    <>
      <div className="container">
        <div className="mb-5 mt-5">
          <h1>Tools list</h1>
          <p>Page that list all your tools information.</p>
        </div>
        <ToolCard tools={tools} />
      </div>
    </>
  );
};

export default Tools;
