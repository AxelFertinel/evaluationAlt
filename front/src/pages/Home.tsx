import Badge from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, Wrench, Newspaper, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { getTools as apiGetTools } from "@/api/tools";

const Home = () => {
  const [tools, setTools] = useState<any[] | null>(null);
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await apiGetTools();
        setTools(response ?? null);
      } catch (e) {
        console.error(e);
        setTools(null);
      }
    };
    fetchTools();
  }, []);

  console.log("🚀 ~ Home ~ tools:", tools);
  return (
    <>
      <div className="container">
        <div className="mb-5 mt-5 ">
          <h1>Header</h1>
          <p>
            Monitoring and manage your organization's software tool and expenses
            test
          </p>
        </div>
        <div className="mb-5  grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card monthly budget */}
          <div className="rounded-lg border bg-card  shadow-sm flex flex-col h-full p-5">
            <div className="flex justify-between  mb-5">
              <p>Monthly Budget</p>
              <div className="p-1.5 bg-budget  rounded-lg">
                <TrendingUp color="white" size={20} />
              </div>
            </div>
            <div>
              <p className="text-xl font-bold">
                €28,750/<span className="text-gray-500">€30k</span>
              </p>

              <p className="bg-budget text-sm  badge">+12%</p>
            </div>
          </div>
          {/* Card Active tool */}
          <div className="rounded-lg border bg-card  shadow-sm flex flex-col h-full p-5">
            <div className="flex justify-between  mb-5">
              <p>Active Tools</p>
              <div className="p-1.5 bg-tool rounded-lg">
                <Wrench color="white" size={20} />
              </div>
            </div>
            <div>
              <p className="text-xl font-bold">147</p>
              <p className="bg-tool text-sm  badge">+8%</p>
            </div>
          </div>
          {/* Card Departments*/}
          <div className="rounded-lg border bg-card  shadow-sm flex flex-col h-full p-5">
            <div className="flex justify-between  mb-5">
              <p>Departments</p>
              <div className="p-1.5 bg-department rounded-lg">
                <Newspaper color="white" size={20} />
              </div>
            </div>
            <div>
              <p className="text-xl font-bold">8</p>
              <p className="bg-department text-sm  badge">+2</p>
            </div>
          </div>
          {/* Car Cost/user */}
          <div className="rounded-lg border bg-card  shadow-sm flex flex-col h-full p-5">
            <div className="flex justify-between  mb-5">
              <p>Cost/User</p>
              <div className="p-1.5 bg-user rounded-lg">
                <Users color="white" size={20} />
              </div>
            </div>
            <div>
              <p className="text-xl font-bold">€156</p>
              <p className="bg-user text-sm  badge">-€12</p>
            </div>
          </div>
        </div>
        {/* Tableau recent Tools */}
        <div className="p-5 bg-card text-card-foreground rounded-lg shadow-sm ">
          <div className="flex justify-between">
            <h2>Recent Tools</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool</TableHead>
                <TableHead>Departement</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Monthly Cost</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tools && tools.length > 0 ? (
                tools.map((tool: any) => (
                  <TableRow key={tool.name + tool.updated_at}>
                    <TableCell>{tool.name}</TableCell>
                    <TableCell>
                      {tool.owner_department ?? tool.category ?? "-"}
                    </TableCell>
                    <TableCell>{tool.users_count ?? "-"}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat(undefined, {
                        style: "currency",
                        currency: "EUR",
                      }).format(tool.monthly_cost)}
                    </TableCell>
                    <TableCell>{Badge(tool.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>No recent tools</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Home;
