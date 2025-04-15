const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()


console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY ? "Cargado" : "No cargado");


const supabaseUrl=process.env.SUPABASE_URL;
const supabaseKey=process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);


module.exports = supabase;


