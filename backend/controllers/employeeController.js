const supabase = require('../models/supabaseClient'); // Import the client

// 1. GET all employees
const getEmployees = async (req, res) => {
  // Select all columns from the 'employees' table
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .order('id', { ascending: true }); // Optional: order by ID

  if (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({ error: 'Failed to retrieve employees.' });
  }

  // Successful response
  res.status(200).json(data);
};

// 2. GET employee by ID
const getEmployeeById = async (req, res) => {
  const id = req.params.id; // ID comes from the route parameters (e.g., /employees/1)

  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('id', id) // Filter where the 'id' column equals the provided ID
    .single(); // Expect a single row back

  if (error && error.code !== 'PGRST116') { // PGRST116 means 'No rows found'
    console.error(`Error fetching employee with ID ${id}:`, error);
    return res.status(500).json({ error: `Failed to retrieve employee ${id}.` });
  }
  
  // Check if data is null (no employee found)
  if (!data) {
    return res.status(404).json({ message: `Employee with ID ${id} not found.` });
  }

  res.status(200).json(data);
};

// 3. POST new employee
const createEmployee = async (req, res) => {
  const { name, email, position } = req.body;
  
  // Basic validation (more robust validation should be added)
  if (!name || !email || !position) {
    return res.status(400).json({ message: 'Missing required fields: name, email, and position.' });
  }

  // Insert the new employee data. 'select' ensures the newly created row is returned.
  const { data, error } = await supabase
    .from('employees')
    .insert([{ name, email, position }])
    .select() // Return the created employee object
    .single();

  if (error) {
    console.error("Error creating employee:", error);
    // Handle specific PostgreSQL/Supabase errors, e.g., duplicate email
    if (error.code === '23505') { // PostgreSQL unique constraint violation
        return res.status(409).json({ error: 'An employee with this email already exists.' });
    }
    return res.status(500).json({ error: 'Failed to create employee.' });
  }

  res.status(201).json(data);
};

// 4. PUT/PATCH update employee
const updateEmployee = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  
  // Update the row matching the ID with the data from req.body
  const { data, error } = await supabase
    .from('employees')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error(`Error updating employee with ID ${id}:`, error);
    return res.status(500).json({ error: `Failed to update employee ${id}.` });
  }

  if (!data) {
    return res.status(404).json({ message: `Employee with ID ${id} not found.` });
  }

  res.status(200).json(data);
};

// 5. DELETE employee
const deleteEmployee = async (req, res) => {
  const id = req.params.id;

  // Perform the deletion, and use .select() to get the deleted row (to confirm deletion)
  const { data, error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error(`Error deleting employee with ID ${id}:`, error);
    return res.status(500).json({ error: `Failed to delete employee ${id}.` });
  }

  if (!data) {
    return res.status(404).json({ message: `Employee with ID ${id} not found.` });
  }
  
  // Success with no content (204) or return the deleted object (200)
  // We'll use 200 and return the deleted object for clarity
  res.status(200).json({ message: `Employee with ID ${id} successfully deleted.`, deletedEmployee: data });
};

// Export all controller functions
module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};