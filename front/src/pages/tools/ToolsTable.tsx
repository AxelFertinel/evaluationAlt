import Badge from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Tools } from "@/interfaces/tools";

const ToolsTable = ({ tools }: Tools) => {
  return (
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
              <TableCell>{tool.active_users_count ?? "-"}</TableCell>
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
  );
};

export default ToolsTable;
