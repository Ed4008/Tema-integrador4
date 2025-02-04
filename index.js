const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Supabase
const supabaseUrl = 'SUA_URL_DO_SUPABASE';
const supabaseKey = 'SUA_CHAVE_DE_API_DO_SUPABASE';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.get('/api/cursos', async (req, res) => {
    const { data, error } = await supabase
        .from('cursos')
        .select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/api/cadastrar', async (req, res) => {
    const { nome, email, senha } = req.body;
    const { data, error } = await supabase
        .from('usuarios')
        .insert([{ nome, email, senha }]);
    if (error) return res.status(500).json({ success: false, error: error.message });
    res.json({ success: true });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
