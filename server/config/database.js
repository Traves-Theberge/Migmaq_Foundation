const { createClient } = require('@supabase/supabase-js'); // Import the Supabase client creation function

const supabaseUrl = process.env.SUPABASE_URL; // Get the Supabase URL from environment variables
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY; // Get the Supabase anon key from environment variables

const supabase = createClient(supabaseUrl, supabaseAnonKey); // Create a Supabase client

module.exports = supabase; // Export the Supabase client
