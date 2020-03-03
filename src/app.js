let ordemOriginal = {};

jQuery.fn.shuffleChildren = function () {
    let p = this[0];
    for (let i = p.children.length; i >= 0; i--) {
        p.appendChild(p.children[Math.random() * i | 0]);
        ordemOriginal[i] = i;
    }

    delete (ordemOriginal[p.children.length + 1]);

};

jQuery.fn.recuperarOrdemOriginal = function () {
    let p = this[0];
    $(p).children().hide();
    for (let i = 0; i < p.children.length; i++) {
        p.appendChild(p.children[ordemOriginal[i]]);
    }
    $(p).children().show();
}

// function alternarVisibilidadeTabela() {
//     $('table').slideToggle();
// }

function convertFormToCSV(formData) {
    let data = '';

    formData.forEach(
        question => {
            data += question.value + ';';
        }
    );

    data += '\n';

    let i = 0;
    for (i = 0, len = localStorage.length; i < len; ++i) {
        localStorage.getItem(localStorage.key(i));
    }

    // alert('numero de sujeitos: ' + (++i));

    localStorage.setItem('sujeito_' + ++i, data);
}

function readFormData(event) {
    event.preventDefault();
    $('.carousel-inner').recuperarOrdemOriginal();
    let dadosFormulario = $("form").serializeArray();

    convertFormToCSV(dadosFormulario);
}

function fetchDataFromLocalStorage() {
    let resultado = '';
    let i = 0;
    for (i = 0, len = localStorage.length; i < len; ++i) {
        resultado += localStorage.getItem(localStorage.key(i));
    }

    resultado += '\n';

    return resultado;
}


function exportarCSV() {
    alert('Ainda não implementado');
}


function popularTabela() {
    const csv = fetchDataFromLocalStorage()
    const lines = csv.split('\n');

    lines.forEach((line, idx) => {
        if (line.length > 0) {

            const row = document.createElement('tr');

            const idxCell = document.createElement('td');
            idxCell.innerText = `${idx + 1}`;
            row.append(idxCell);

            line.split(';').forEach(cell => {

                const data = document.createElement('td');
                data.innerText = cell;
                row.append(data);

            });

            document.querySelector('tbody').append(row);
        }
    });

    $('table.table')[0].innerHTML += `            
            <tr>
                <th colspan="3">
                    <b>TOTAL</b>
                </th>
                <td>
                    ${lines.length - 1}
                </td>
            </tr>
        `;
}

$('#emocoes .emocao select').on('touch click change', function (event) {
    if (event.target.value == -1) {
        $(event.target).addClass('is-invalid');
        $(event.target).removeClass('is-valid');
    } else {
        $(event.target).addClass('is-valid');
        $(event.target).removeClass('is-invalid');
    }
});

const respostasFrases = {
    1: 'Discordo totalmente',
    2: 'Discordo em parte',
    3: 'Não concordo e nem discordo',
    4: 'Discordo em parte',
    5: 'Concordo totalmente',
};


$(() => {
    $('.concordancia input').on('input change', function (event) {
        $(event.target).next('span').text(respostasFrases[event.target.value]);
    });
})
