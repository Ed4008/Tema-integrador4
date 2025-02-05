const SUPABASE_URL = 'https://zziqvyaqorsuxxyruiwr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6aXF2eWFxb3JzdXh4eXJ1aXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3MDE2MTQsImV4cCI6MjA1NDI3NzYxNH0.fkcuUJp9uhxKdoGniDk3V0quSpwMZL2gr8GcxMXCYgQ';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById('form-cadastro').addEventListener('submit', async function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        // Criar usuário no Supabase Auth
        const { user, error: authError } = await client.auth.signUp({ email, password: senha });

        if (authError) {
            throw new Error(authError.message || "Erro ao criar usuário");
        }

        // Inserir dados na tabela 'usuarios'
        const { data, error: dbError } = await client
            .from('usuarios')
            .insert([{ 
                nome, 
                email,
                user_id: user.id // Adicione se a tabela exigir
            }]);

        if (dbError) {
            throw new Error(dbError.message || "Erro ao salvar dados");
        }

        alert('Cadastro realizado com sucesso!');
        window.location.href = 'cursos.html';

    } catch (error) {
        alert('Erro no cadastro: ' + (error.message || "Erro desconhecido"));
        console.error("Detalhes do erro:", error);
    }
});
