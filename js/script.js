const SUPABASE_URL = 'https://zziqvyaqorsuxxyruiwr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6aXF2eWFxb3JzdXh4eXJ1aXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3MDE2MTQsImV4cCI6MjA1NDI3NzYxNH0.fkcuUJp9uhxKdoGniDk3V0quSpwMZL2gr8GcxMXCYgQ';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById('form-cadastro').addEventListener('submit', async function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        console.log("Iniciando cadastro...");

        // Passo 1: Criar usuário no Supabase Auth
        const { user, error: authError } = await client.auth.signUp({ 
            email, 
            password: senha 
        });

        console.log("Resposta do Supabase Auth:", { user, authError });

        if (authError) {
            throw new Error(authError.message || "Erro ao criar usuário na autenticação");
        }

        // Verifique se o usuário foi criado com sucesso
        if (!user) {
            throw new Error("Usuário não foi criado corretamente.");
        }

        // Passo 2: Inserir dados na tabela 'usuarios'
        console.log("Inserindo dados na tabela 'usuarios'...");
        const { data, error: dbError } = await client
            .from('usuarios')
            .insert([{ 
                nome, 
                email,
                user_id: user.id // Adicione se a tabela exigir
            }]);

        console.log("Resposta do INSERT:", { data, dbError });

        if (dbError) {
            throw new Error(dbError.message || "Erro ao salvar dados no banco");
        }

        alert('Cadastro realizado com sucesso!');
        window.location.href = 'cursos.html';

    } catch (error) {
        console.error("Detalhes do erro:", error);
        alert('Erro no cadastro: ' + (error.message || "Erro desconhecido"));
    }
});
