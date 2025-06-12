let categorias = []
let proximoCodigo = 1
let editandoId = null

function addCategoria() {
    const input = document.getElementById("nmCategoria")
    const nomeCategoria = input.value.trim()

    if (nomeCategoria === "") {
        alert("Por favor, insira o nome da categoria.")
        return
    }

    if (editandoId !== null) {
        const index = categorias.findIndex(cat => cat.codigo === editandoId)
        if (index !== -1) {
            categorias[index].nome = nomeCategoria
        }
        editandoId = null
    } else {
        const novaCategoria = {
            codigo: proximoCodigo++,
            nome: nomeCategoria
        }
        categorias.push(novaCategoria)
    }

    input.value = ""
    renderizarCategorias()
    document.getElementById("btnSalvar").textContent = "Cadastrar categoria"
}

function removerCategoria(codigo) {
    categorias = categorias.filter(cat => cat.codigo !== codigo)
    renderizarCategorias()
}

function editarCategoria(codigo) {
    const categoria = categorias.find(cat => cat.codigo === codigo)
    if (categoria) {
        document.getElementById("nmCategoria").value = categoria.nome
        editandoId = codigo
        document.getElementById("btnSalvar").textContent = "Salvar edição"
    }
}

function renderizarCategorias() {
    const tabela = document.getElementById("categorias")
    tabela.innerHTML = ""

    categorias.forEach(categoria => {
        const linha = document.createElement("tr")
        linha.innerHTML = `
            <td>${categoria.codigo}</td>
            <td>${categoria.nome}</td>
            <td>
                <button class="btn btn-sm btn-warning me-2" onclick="editarCategoria(${categoria.codigo})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="removerCategoria(${categoria.codigo})">Excluir</button>
            </td>
        `
        tabela.appendChild(linha)
    })
}
