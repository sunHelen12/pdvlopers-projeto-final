const { createClient } = require('@supabase/supabase-js');

// Configuração do cliente Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Use service key para operações admin

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase URL e Service Key são obrigatórios no arquivo .env');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

module.exports = supabase;