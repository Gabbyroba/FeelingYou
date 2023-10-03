// URL da API
const apiURL = "https://fastapisentimentos.onrender.com/analisar-sentimento";  

async function analisarSentimento() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selectedSentimentos = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    if (selectedSentimentos.length === 0) {
        alert('Por favor, selecione pelo menos um sentimento.');
        return;
    }

    try {
        const response = await fetch(apiURL, {
            method: 'POST',  // Certifique-se de que a solicitação seja um POST
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sentimento: selectedSentimentos.join(', ')
            })
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar a solicitação. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Dados da API:', data);

        const respostaPolaridade = document.getElementById('resposta-polaridade');
        const musicasSugeridas = data.musicas_sugeridas.join(', '); // Concatenar músicas sugeridas
        respostaPolaridade.textContent = 'Músicas Sugeridas: ' + musicasSugeridas; // Exibir todas as músicas sugeridas

    } catch (error) {
        console.error(error);
        alert('Ocorreu um erro ao analisar o sentimento.');
    }
}

// Selecione todos os checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Adicione um evento de clique a cada checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        // Desmarque todos os outros checkboxes
        checkboxes.forEach(otherCheckbox => {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
            }
        });
    });
});

// Adicionar um evento de clique ao botão "Analisar"
const botaoAnalisar = document.getElementById('botao-analisar');
botaoAnalisar.addEventListener('click', analisarSentimento);