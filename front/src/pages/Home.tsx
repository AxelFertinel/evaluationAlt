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
const Home = () => {
  return (
    <>
      <div className="container">
        <div className="mb-5 mt-5 ">
          <h1>Header</h1>
          <p>
            Monitoring and manage your organization's software tool and expenses
          </p>
        </div>
        <div className="mb-5  grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-lg border bg-card  shadow-sm flex flex-col h-full p-5">
            <div className="flex justify-between  mb-5">
              <p>Monthly Budget</p>
              <div className="p-1.5 bg-budget  rounded-lg">
                <TrendingUp color="white" size={20} />
              </div>
            </div>
            <div>
              <p>€28,750/€30k</p>
              <p>+ 12%</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card  shadow-sm flex flex-col h-full p-5">
            <div className="flex justify-between  mb-5">
              <p>Active Tools</p>
              <div className="p-1.5 bg-tool rounded-lg">
                <Wrench color="white" size={20} />
              </div>
            </div>
            <div>
              <p>147</p>
              <p>+8%</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card  shadow-sm flex flex-col h-full p-5">
            <div className="flex justify-between  mb-5">
              <p>Departments</p>
              <div className="p-1.5 bg-department rounded-lg">
                <Newspaper color="white" size={20} />
              </div>
            </div>
            <div>
              <p>8</p>
              <p>+2</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card  shadow-sm flex flex-col h-full p-5">
            <div className="flex justify-between  mb-5">
              <p>Cost/User</p>
              <div className="p-1.5 bg-user rounded-lg">
                <Users color="white" size={20} />
              </div>
            </div>
            <div>
              <p>€156</p>
              <p>-€12</p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-card text-card-foreground rounded-lg shadow-sm ">
          <div className="flex justify-between">
            <h2>Recent Tools</h2>
            <p>last 30 days</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool</TableHead>
                <TableHead>Departement</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Monthly Cost</TableHead>
                <TableHead>{Badge("Active", "active")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Slack</TableCell>
                <TableCell>Communication</TableCell>
                <TableCell>245</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>{Badge("Expired", "expired")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Slack</TableCell>
                <TableCell>Communication</TableCell>
                <TableCell>245</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>{Badge("Unused", "unused")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Slack</TableCell>
                <TableCell>Communication</TableCell>
                <TableCell>245</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>{Badge("Active", "active")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Home;
