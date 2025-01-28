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
                <p><strong>Data da Situação Cadastral:</strong> ${data.data_situacao_cadastral}</p>
                <p><strong>Opção pelo Simples:</strong> ${data.opcao_pelo_simples ? "Sim" : "Não"}</p>
                <p><strong>Opção pelo MEI:</strong> ${data.opcao_pelo_mei ? "Sim" : "Não"}</p>
                <p><strong>Data de Início da Atividade:</strong> ${data.data_inicio_atividade}</p>
                <p><strong>Capital Social:</strong> R$ ${data.capital_social.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p><strong>Porte:</strong> ${data.porte}</p>
                <hr>
                <h3>Endereço</h3>
                <p><strong>Logradouro:</strong> ${data.logradouro}, ${data.numero}</p>
                <p><strong>Bairro:</strong> ${data.bairro}</p>
                <p><strong>Município:</strong> ${data.municipio} - ${data.uf}</p>
                <p><strong>CEP:</strong> ${data.cep}</p>
                <hr>
                <h3>Contatos</h3>
                <p><strong>Telefone 1:</strong> ${data.ddd_telefone_1 || "Não informado"}</p>
                <p><strong>Telefone 2:</strong> ${data.ddd_telefone_2 || "Não informado"}</p>
                <p><strong>Email:</strong> ${data.email || "Não informado"}</p>
                <hr>
                <h3>Quadro de Sócios</h3>
            `;

            if (data.qsa && data.qsa.length > 0) {
                data.qsa.forEach(socio => {
                    html += `
                        <p><strong>Nome:</strong> ${socio.nome_socio}</p>
                        <p><strong>Qualificação:</strong> ${socio.qualificacao_socio}</p>
                        <p><strong>Faixa Etária:</strong> ${socio.faixa_etaria}</p>
                        <p><strong>Data de Entrada:</strong> ${socio.data_entrada_sociedade}</p>
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
