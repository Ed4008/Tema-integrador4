const SUPABASE_URL = 'https://zziqvyaqorsuxxyruiwr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6aXF2eWFxb3JzdXh4eXJ1aXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3MDE2MTQsImV4cCI6MjA1NDI3NzYxNH0.fkcuUJp9uhxKdoGniDk3V0quSpwMZL2gr8GcxMXCYgQ';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById('form-login').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    const { user, error } = await client.auth.signIn({ email, password: senha });

    if (error) {
        alert('Login falhou: ' + error.message);
    } else {
        // Redireciona para a página de cursos
        window.location.href = 'cursos.html';
    }
});

document.getElementById('form-cadastro').addEventListener('submit', async function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const { user, error } = await client.auth.signUp({ email, password: senha });

    if (error) {
        alert('Cadastro falhou: ' + error.message);
    } else {
        // Insere o usuário na tabela 'usuarios'
        await client.from('usuarios').insert([{ nome, email }]);
        alert('Cadastro realizado com sucesso!');
        // Redireciona para a página de cursos
        window.location.href = 'cursos.html';
    }
});
