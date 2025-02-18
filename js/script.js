// Configuração do Supabase
const supabaseUrl = 'https://zziqvyaqorsuxxyruiwr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6aXF2eWFxb3JzdXh4eXJ1aXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3MDE2MTQsImV4cCI6MjA1NDI3NzYxNH0.fkcuUJp9uhxKdoGniDk3V0quSpwMZL2gr8GcxMXCYgQ';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Função para realizar o login
document.getElementById('form-login').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
    });

    if (error) {
        alert('Erro ao fazer login: ' + error.message);
    } else {
        alert('Login realizado com sucesso!');
        // Redirecionar para a página de cursos ou outra página após o login
        window.location.href = 'cursos.html';
    }
});

// Função para realizar o cadastro
document.getElementById('form-cadastro').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
        options: {
            data: {
                nome: nome,
            },
        },
    });

    if (error) {
        alert('Erro ao cadastrar: ' + error.message);
    } else {
        alert('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar.');
        // Redirecionar para a página de login após o cadastro
        window.location.href = 'index.html#login';
    }
});
