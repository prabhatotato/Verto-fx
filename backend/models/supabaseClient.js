
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Load environment variables

// Get credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Check for missing environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("FATAL ERROR: Supabase URL or Anon Key is not defined in environment variables.");
  process.exit(1); // Stop the application if credentials are missing
}

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("Supabase client initialized successfully.");

module.exports = supabase;