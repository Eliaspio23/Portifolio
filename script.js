// Define o nome de usuário do GitHub que será utilizado na busca dos projetos.
// Altere para o seu próprio nome de usuário, se necessário.
const githubUser = "Eliaspio23"; // Altere para seu nome de usuário do GitHub

// Função assíncrona responsável por buscar e exibir os projetos públicos do GitHub
async function carregarProjetosGitHub() {
    // Seleciona a div onde os projetos serão exibidos
    const projetosDiv = document.getElementById('github-projects');
    // Mostra mensagem de carregamento enquanto os dados são buscados
    projetosDiv.innerHTML = '<p>Carregando projetos...</p>';
    try {
        // Faz a requisição à API pública do GitHub para buscar os repositórios do usuário
        const resposta = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated`);
        // Se a resposta não for OK (erro na requisição), lança um erro
        if (!resposta.ok) throw new Error('Não foi possível buscar os projetos do GitHub.');
        // Converte a resposta para JSON
        const repos = await resposta.json();
        // Se não encontrar nenhum repositório público, exibe mensagem correspondente
        if (!repos.length) {
            projetosDiv.innerHTML = '<p>Nenhum projeto público encontrado.</p>';
            return;
        }
        // Cria uma lista para exibir os projetos
        const ul = document.createElement('ul');
        // Para cada repositório encontrado, cria um item de lista (<li>)
        repos.forEach(repo => {
            const li = document.createElement('li');
            // O item mostra o nome do projeto (link para o GitHub) e uma breve descrição
            li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a> &mdash; ${repo.description || 'Sem descrição'}`;
            ul.appendChild(li);
        });
        // Limpa o conteúdo anterior e adiciona a lista de projetos à página
        projetosDiv.innerHTML = '';
        projetosDiv.appendChild(ul);
    } catch (e) {
        // Se ocorrer algum erro durante o processo, exibe mensagem de erro
        projetosDiv.innerHTML = `<p>Erro ao carregar projetos: ${e.message}</p>`;
    }
}

// Quando o conteúdo da página for carregado, executa a função para buscar os projetos
document.addEventListener('DOMContentLoaded', carregarProjetosGitHub);