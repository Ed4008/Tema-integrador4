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
        document.getElementById('login').style.display = 'none';
        document.getElementById('cadastro').style.display = 'none';
        document.getElementById('cursos').style.display = 'block';
        document.getElementById('tutoriais').style.display = 'block';
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
        await client.from('usuarios').insert([{ nome, email }]);
        alert('Cadastro realizado com sucesso!');
    }
});

function inscreverCurso(nomeCurso) {
    alert(`Inscrição no curso "${nomeCurso}" realizada com sucesso!`);
}
