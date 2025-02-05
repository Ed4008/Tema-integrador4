const SUPABASE_URL = 'https://zziqvyaqorsuxxyruiwr.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6aXF2eWFxb3JzdXh4eXJ1aXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3MDE2MTQsImV4cCI6MjA1NDI3NzYxNH0.fkcuUJp9uhxKdoGniDk3V0quSpwMZL2gr8GcxMXCYgQ'; 

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Verifica se o usuário já está logado ao carregar a página
async function checkAuth() {
    const { data: { user }, error } = await client.auth.getUser();

    if (user) {
        // Se o usuário estiver logado, redireciona para a página de cursos
        window.location.href = 'cursos.html';
    }
}

// Executa a verificação ao carregar a página
checkAuth();

document.getElementById('form-login').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    try {
        const { user, error } = await client.auth.signInWithPassword({ email, password: senha });

        if (error) {
            throw error; // Lança o erro para ser capturado no catch
        }

        // Redireciona para a página de cursos
        window.location.href = 'cursos.html';
    } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro no login: ' + error.message);
    }
});

document.getElementById('form-cadastro').addEventListener('submit', async function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const { user, error } = await client.auth.signUp({ email, password: senha });

        if (error) {
            throw error; // Lança o erro para ser capturado no catch
        }

        // Insere o usuário na tabela 'usuarios'
        const { data, error: insertError } = await client
            .from('usuarios')
            .insert([{ nome, email }]);

        if (insertError) {
            throw insertError; // Lança o erro para ser capturado no catch
        }

        alert('Cadastro realizado com sucesso!');
        // Redireciona para a página de cursos
        window.location.href = 'cursos.html';
    } catch (error) {
        console.error('Erro no cadastro:', error);
        alert('Erro no cadastro: ' + error.message);
    }
});
