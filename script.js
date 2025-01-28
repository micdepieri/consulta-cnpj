async function consultarCNPJ() {
    let cnpj = document.getElementById("cnpj").value.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cnpj.length !== 14) {
        alert("Digite um CNPJ válido com 14 números!");
        return;
    }

    let url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.razao_social) {
            let html = `
                <h2>Dados da Empresa</h2>
                <p><strong>Razão Social:</strong> ${data.razao_social}</p>
                <p><strong>Nome Fantasia:</strong> ${data.nome_fantasia || "Não informado"}</p>
                <p><strong>CNPJ:</strong> ${data.cnpj}</p>
                <p><strong>Atividade Principal:</strong> ${data.cnae_fiscal_descricao}</p>
                <p><strong>Natureza Jurídica:</strong> ${data.natureza_juridica}</p>
                <p><strong>Situação Cadastral:</strong> ${data.descricao_situacao_cadastral}</p>
                <p><strong>Endereço:</strong> ${data.logradouro}, ${data.numero}, ${data.bairro}, ${data.municipio} - ${data.uf}</p>
                <p><strong>CEP:</strong> ${data.cep}</p>
                <hr>
                <h3>Quadro de Sócios</h3>
            `;

            if (data.qsa && data.qsa.length > 0) {
                data.qsa.forEach(socio => {
                    html += `
                        <p><strong>Nome:</strong> ${socio.nome_socio}</p>
                        <p><strong>Qualificação:</strong> ${socio.qualificacao_socio}</p>
                        <hr>
                    `;
                });
            } else {
                html += "<p>Nenhum sócio registrado.</p>";
            }

            document.getElementById("resultado").innerHTML = html;
        } else {
            document.getElementById("resultado").innerHTML = "<p>CNPJ não encontrado ou inválido.</p>";
        }
    } catch (error) {
        console.error("Erro ao buscar CNPJ:", error);
        document.getElementById("resultado").innerHTML = "<p>Erro ao buscar informações. Tente novamente.</p>";
    }
}
