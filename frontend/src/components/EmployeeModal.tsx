import { useState, useEffect } from "react";
import { Employee, EmployeeFormData } from "@/types/employee";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EmployeeFormData) => void;
  employee?: Employee | null;
}

export const EmployeeModal = ({ isOpen, onClose, onSave, employee }: EmployeeModalProps) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    position: "",
  });

  const [errors, setErrors] = useState<Partial<EmployeeFormData>>({});

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        position: employee.position,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        position: "",
      });
    }
    setErrors({});
  }, [employee, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<EmployeeFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleInputChange = (field: keyof EmployeeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-container-bg border-border-light shadow-modal">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-text-primary font-bold">
            {employee ? "Edit Employee Details" : "Add New Employee"}
          </DialogTitle>
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-text-secondary hover:text-text-primary"
          >
            <X className="h-4 w-4" />
          </Button> */}
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-text-primary font-medium">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Full Name"
              className={`bg-input-bg border-input-border focus:border-input-focus focus:ring-input-focus ${
                errors.name ? "border-destructive" : ""
              }`}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-text-primary font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Work Email"
              className={`bg-input-bg border-input-border focus:border-input-focus focus:ring-input-focus ${
                errors.email ? "border-destructive" : ""
              }`}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="position" className="text-text-primary font-medium">
              Position
            </Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
              placeholder="Job Title"
              className={`bg-input-bg border-input-border focus:border-input-focus focus:ring-input-focus ${
                errors.position ? "border-destructive" : ""
              }`}
            />
            {errors.position && (
              <p className="text-sm text-destructive">{errors.position}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1 bg-secondary text-text-secondary hover:bg-secondary/80"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-button"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};