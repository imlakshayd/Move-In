
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = `https://npqdwbjfhjhxgnnbdjue.supabase.co`;
const supabaseKey = `sb_publishable_2fRxU_GDhXKJiLzI6mtiIQ_B7JFEN5e`; 


//const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
