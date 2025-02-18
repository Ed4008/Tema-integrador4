// Configuração do Supabase
const SUPABASE_URL = 'https://zziqvyaqorsuxxyruiwr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6aXF2eWFxb3JzdXh4eXJ1aXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3MDE2MTQsImV4cCI6MjA1NDI3NzYxNH0.fkcuUJp9uhxKdoGniDk3V0quSpwMZL2gr8GcxMXCYgQ';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Função utilitária para exibir mensagens
const showMessage = (message, isError = true) => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${isError ? 'error' : 'success'}`;
    alertDiv.textContent = message;
    document.body.prepend(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
};

// Login
document.getElementById('form-login')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const senha = document.getElementById('login-senha').value.trim();

    if (!email || !senha) {
        showMessage('Preencha todos os campos!');
        return;
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
        
        if (error) throw error;
        
        showMessage('Login realizado! Redirecionando...', false);
        setTimeout(() => window.location.href = 'cursos.html', 2000);
        
    } catch (error) {
        console.error('Erro login:', error);
        showMessage(`Falha no login: ${error.message}`);
    }
});

// Cadastro
document.getElementById('form-cadastro')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!nome || !email || !senha) {
        showMessage('Preencha todos os campos!');
        return;
    }

    if (senha.length < 6) {
        showMessage('Senha deve ter no mínimo 6 caracteres!');
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password: senha,
            options: {
                data: { nome },
                emailRedirectTo: window.location.href
            }
        });

        if (error) throw error;
        
        showMessage('Cadastro realizado! Verifique seu e-mail.', false);
        document.getElementById('form-cadastro').reset();
        
    } catch (error) {
        console.error('Erro cadastro:', error);
        showMessage(`Erro no cadastro: ${error.message}`);
    }
});
