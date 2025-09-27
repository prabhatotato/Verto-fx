import { useState } from "react";
import { Employee, EmployeeFormData } from "@/types/employee";
import { EmployeeTable } from "@/components/EmployeeTable";
import { EmployeeModal } from "@/components/EmployeeModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "@/services/api";

const EmployeeHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  // Fetch employees from backend
  const { data: employeesData, isLoading, isError } = useQuery<
    { data: Employee[] }
  >({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  // Mutations
  const addEmployeeMutation = useMutation<Employee, unknown, EmployeeFormData>({
    mutationFn: createEmployee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });

  

  const updateEmployeeMutation = useMutation({
    mutationFn: ({ id, employee }: { id: string; employee: EmployeeFormData }) =>
      updateEmployee(id, employee),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });

  const deleteEmployeeMutation = useMutation<string, unknown, string>({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });

  // Filter employees based on search term
  const filteredEmployees =
    employeesData?.data.filter(
      (employee: Employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSaveEmployee = (formData: EmployeeFormData) => {
    if (editingEmployee) {
      // Update existing employee
      updateEmployeeMutation.mutate({ id: editingEmployee.id, employee: formData });
      toast({
        title: "Employee Updated",
        description: `${formData.name} has been updated successfully.`,
      });
    } else {
      // Add new employee
      addEmployeeMutation.mutate(formData);
      toast({
        title: "Employee Added",
        description: `${formData.name} has been added to the team.`,
      });
    }
    setIsModalOpen(false);
  };

  const handleDeleteEmployee = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      const employee = employeesData?.data.find((emp: Employee) => emp.id === deleteId);
      deleteEmployeeMutation.mutate(deleteId);
      setDeleteId(null);
      toast({
        title: "Employee Removed",
        description: `${employee?.name} has been removed from the team.`,
      });
    }
  };

  if (isLoading) return <div className="p-8">Loading employees...</div>;
  if (isError) return <div className="p-8 text-red-500">Failed to load employees.</div>;

  return (
    <div className="min-h-screen bg-app-bg font-lato">
      {/* Header/Toolbar */}
      <div className="bg-app-bg px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl font-bold text-text-primary">Employee Hub</h1>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-4 w-4" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80 bg-container-bg border-border-light focus:border-input-focus focus:ring-input-focus"
                />
              </div>

              <Button
                onClick={handleAddEmployee}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-button flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add New Employee
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <EmployeeTable
            employees={filteredEmployees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />
        </div>
      </div>

      {/* Add/Edit Modal */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEmployee}
        employee={editingEmployee}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Employee"
        description="Are you sure you want to remove this employee? This action cannot be undone."
      />
    </div>
  );
};

export default EmployeeHub;
