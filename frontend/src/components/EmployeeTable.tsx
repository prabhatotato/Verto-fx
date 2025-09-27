import { Employee } from "@/types/employee";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export const EmployeeTable = ({ employees, onEdit, onDelete }: EmployeeTableProps) => {
  return (
    <div className="bg-container-bg rounded-lg shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-table-header">
            <tr>
              <th className="text-left py-4 px-6 text-text-primary font-bold">ID</th>
              <th className="text-left py-4 px-6 text-text-primary font-bold">Name</th>
              <th className="text-left py-4 px-6 text-text-primary font-bold">Email</th>
              <th className="text-left py-4 px-6 text-text-primary font-bold">Position</th>
              <th className="text-center py-4 px-6 text-text-primary font-bold w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr 
                key={employee.id} 
                className="border-b border-border-light hover:bg-table-hover transition-colors duration-150"
              >
                <td className="py-4 px-6 text-text-secondary font-mono text-sm">{employee.id}</td>
                <td className="py-4 px-6 text-text-primary font-medium">{employee.name}</td>
                <td className="py-4 px-6 text-text-secondary">{employee.email}</td>
                <td className="py-4 px-6 text-text-secondary">{employee.position}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(employee)}
                      className="h-8 w-8 p-0 text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(employee.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {employees.length === 0 && (
          <div className="text-center py-12 text-text-secondary">
            No employees found. Add your first employee to get started.
          </div>
        )}
      </div>
    </div>
  );
};