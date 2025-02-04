document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');
    const formCadastro = document.getElementById('form-cadastro');
    const sectionCursos = document.getElementById('cursos');
    const sectionTutoriais = document.getElementById('tutoriais');
    const sectionCadastro = document.getElementById('cadastro');

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const senha = document.getElementById('login-senha').value;

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();
        if (data.success) {
            sectionCursos.style.display = 'block';
            sectionTutoriais.style.display = 'block';
            sectionCadastro.style.display = 'none';
            formLogin.style.display = 'none';
        } else {
            alert('Login falhou. Verifique suas credenciais.');
        }
    });

    formCadastro.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const response = await fetch('/api/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await response.json();
        if (data.success) {
            alert('Cadastro realizado com sucesso!');
            sectionCursos.style.display = 'block';
            sectionTutoriais.style.display = 'block';
            sectionCadastro.style.display = 'none';
            formLogin.style.display = 'none';
        } else {
            alert('Erro ao cadastrar. Tente novamente.');
        }
    });

    // Carregar cursos
    fetch('/api/cursos')
        .then(response => response.json())
        .then(data => {
            const listaCursos = document.getElementById('lista-cursos');
            data.forEach(curso => {
                const divCurso = document.createElement('div');
                divCurso.innerHTML = `<h3>${curso.titulo}</h3><p>${curso.descricao}</p>`;
                listaCursos.appendChild(divCurso);
            });
        });
});
