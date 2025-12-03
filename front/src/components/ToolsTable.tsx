import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Tool } from "@/interfaces/tools";
import { Badge } from "./ui/badge";

interface ToolsTableProps {
  tools: Tool[] | null;
}

const ToolsTable = ({ tools }: ToolsTableProps) => {
  return (
    <div className="p-5 bg-white rounded-lg shadow-sm mb-5 border">
      <h2>Recent Tools</h2>
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
            tools.map((tool: Tool) => (
              <TableRow key={tool.name + tool.updated_at}>
                <TableCell>{tool.name}</TableCell>
                <TableCell>
                  {tool.owner_department ?? tool.category ?? "-"}
                </TableCell>
                <TableCell>{tool.active_users_count ?? "-"}</TableCell>
                <TableCell>€{tool.monthly_cost}</TableCell>
                <TableCell>
                  <Badge status={tool.status} />
                </TableCell>
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
  );
};

export default ToolsTable;
