/* RENDERIZAÇÃO DA LISTA DE ALUNOS */
const listStudent = document.querySelector('#student-list');

function renderList(doc) {
    let li = document.createElement('li');
    
    // Criando elementos para exibir cada campo
    let nome = document.createElement('span');
    let cpf = document.createElement('span');
    let rg = document.createElement('span');
    let telefone_aluno = document.createElement('span');
    let telefone_responsavel = document.createElement('span');
    let email = document.createElement('span');
    let data_nascimento = document.createElement('span');

    // Atribuindo os valores dos dados
    nome.textContent = `Nome: ${doc.nome}`;
    cpf.textContent = `CPF: ${doc.cpf}`;
    rg.textContent = `RG: ${doc.rg}`;
    telefone_aluno.textContent = `Telefone Aluno: ${doc.telefone_aluno}`;
    telefone_responsavel.textContent = `Telefone Responsável: ${doc.telefone_responsavel}`;
    email.textContent = `Email: ${doc.email}`;
    data_nascimento.textContent = `Data de Nascimento: ${doc.data_nascimento}`;

    // Adicionando os campos à lista
    li.appendChild(nome);
    li.appendChild(cpf);
    li.appendChild(rg);
    li.appendChild(telefone_aluno);
    li.appendChild(telefone_responsavel);
    li.appendChild(email);
    li.appendChild(data_nascimento);

    listStudent.appendChild(li);
}

/* LISTA OS DADOS DA COLEÇÃO DO FIRESTORE */
db.collection('BD3-NoSQL-Firestore')
    .get()
    .then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderList(doc.data());
        });
    });

/* INSERÇÃO DE DADOS */
const form = document.querySelector('#add-student-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Adiciona os dados à coleção 'alunos-collection'
    db.collection('BD3-NoSQL-Firestore').add({
        nome: form.nome.value,
        cpf: form.cpf.value,
        rg: form.rg.value,
        telefone_aluno: form.telefone_aluno.value,
        telefone_responsavel: form.telefone_responsavel.value || '',
        email: form.email.value,
        data_nascimento: form.data_nascimento.value
    }).then(() => {
        // Limpa os campos do formulário após a inserção
        form.nome.value = '';
        form.cpf.value = '';
        form.rg.value = '';
        form.telefone_aluno.value = '';
        form.telefone_responsavel.value = '';
        form.email.value = '';
        form.data_nascimento.value = '';
        window.location.reload();
    });
});
