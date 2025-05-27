const githubUser = "Eliaspio23";


async function carregarProjetosGitHub() {

    const projetosDiv = document.getElementById('github-projects');

    projetosDiv.innerHTML = '<p>Carregando projetos...</p>';
    try {

        const resposta = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated`);

        if (!resposta.ok) throw new Error('Não foi possível buscar os projetos do GitHub.');

        const repos = await resposta.json();

        if (!repos.length) {
            projetosDiv.innerHTML = '<p>Nenhum projeto público encontrado.</p>';
            return;
        }

        const ul = document.createElement('ul');

        repos.forEach(repo => {
            const li = document.createElement('li');

            li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a> &mdash; ${repo.description || 'Sem descrição'}`;
            ul.appendChild(li);
        });

        projetosDiv.innerHTML = '';
        projetosDiv.appendChild(ul);
    } catch (e) {

        projetosDiv.innerHTML = `<p>Erro ao carregar projetos: ${e.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', carregarProjetosGitHub);
