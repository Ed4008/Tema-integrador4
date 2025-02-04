const SUPABASE_URL = 'SUA_URL_DO_SUPABASE';
const SUPABASE_KEY = 'SUA_KEY_DO_SUPABASE';

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
