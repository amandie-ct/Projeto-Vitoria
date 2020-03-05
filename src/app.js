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

    localStorage.setItem('sujeito_' + ++i, data);
}

function getFormData() {
    const dadosFotos = $('.fotos-container :input').serializeArray().sort((a, b) => { return (a.name > b.name) ? 1 : -1 });
    const outrosDados = $("form").serializeArray();

    let dadosFormularioObject = {
        ...outrosDados,
        ...dadosFotos
    };

    const stringified1 = JSON.stringify(dadosFormularioObject);

    let dadosFormulario = [];

    for (let item in dadosFormularioObject) {
        dadosFormulario.push(dadosFormularioObject[item]);
    }

    const stringified2 = JSON.stringify(dadosFormulario);
    if (stringified1 != stringified2) {
        // console.log(dadosFormulario);
        // console.log(dadosFormularioObject);
    }

    return dadosFormulario;
}

function readFormData(event) {
    event.preventDefault();

    try {
        const dadosFormulario = getFormData();

        storeHeaders(dadosFormulario);

        convertFormToCSV(dadosFormulario);

        alert('Registro armazenado com sucesso...');

        event.target.submit();
    } catch (e) {
        alert('Houve um erro, por favor tente novamente. Se persistir, tente reiniciar.');
    }


}

function fetchDataFromLocalStorage() {
    let resultado = '';
    let i = 0;
    for (i = 0, len = localStorage.length; i < len; ++i) {
        if (localStorage.key(i) != 'headers') {
            resultado += localStorage.getItem(localStorage.key(i));
        }
    }

    resultado += '\n';

    return resultado;
}


function exportarCSV() {
    alert('Ainda não implementado');
}


function popularTabela() {
    const headerCsv = localStorage.getItem('headers');
    const csv = fetchDataFromLocalStorage();
    const lines = csv.split('\n');
    const headers = headerCsv.split(';');

    headers.forEach(header => {
        const data = document.createElement('td');
        data.innerText = header;
        $('table thead tr.headers').append(data);
    });


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

$('#emocoes .emocao select').on('touch click change', function(event) {
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


function aleatorizarFotos() {

    $('.fotos-container').children().each((index, element) => {
        element.style.order = Math.floor(Math.random() * 10000);
    });

}

$(() => {
    $('.concordancia input').on('input change', function(event) {
        $(event.target).next('span').text(respostasFrases[event.target.value]);
    });

    aleatorizarFotos();
});



function __teste() {
    const p = $('p.resultado-ordem')[0];

    $('input').click();

    p.innerText = '';

    const dadosFormulario = getFormData();

    console.log(dadosFormulario);

    dadosFormulario.forEach((obj) => {
        p.innerText += obj.name;
        p.innerText += ' - ';
    });
}



function storeHeaders(formData) {

    const oldHeaders = localStorage.getItem('headers');

    let data = '';

    formData.forEach(
        question => {
            data += question.name + ';';
        }
    );

    data += '\n';

    let i = 0;
    for (i = 0, len = localStorage.length; i < len; ++i) {
        localStorage.getItem(localStorage.key(i));
    }

    localStorage.setItem('headers', data);

    if (oldHeaders && localStorage.getItem('headers') != oldHeaders) {
        alert('erro nos headers');
        console.log(oldHeaders);
        console.log(localStorage.getItem('headers'));
    }
}