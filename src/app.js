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
    // const dadosFotos = $('.fotos-container :input').serializeArray();
    const outrosDados = $("form").serializeArray();

    // let dadosFormularioObject = {
    //     ...outrosDados,
    //     ...dadosFotos
    // };

    let dadosFormularioObject = outrosDados;

    let dadosFormulario = [];

    for (let item in dadosFormularioObject) {
        dadosFormulario.push(dadosFormularioObject[item]);
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

        const key = localStorage.key(i);

        if (key != 'headers' && key.split('_')[0] != 'sujeito') {
            continue;
        }

        if (localStorage.key(i) != 'headers') {
            resultado += localStorage.getItem(key);
        }
    }

    resultado += '\n';

    return resultado;
}


function exportarCSV(event) {
    $(event.target).attr('disabled', true);
    const headerCsv = localStorage.getItem('headers');
    const csv = fetchDataFromLocalStorage();

    if (!csv || !headerCsv) {
        return;
    }

    const lines = csv.split('\n');
    const headers = headerCsv.split(';');

    const data = { "access_token": "ljbk5d13qo8uk6gdqukj3kwp" };


    data['subject'] = 'Exportação de dados';
    data['text'] = `${headerCsv}${csv}`;

    console.log(data['text']);

    $.post('https://postmail.invotes.com/send',
        data,
        () => {
            $(event.target).attr('disabled', false);
            alert('Exportação deu certo!')
        }
    ).fail(() => {
        $(event.target).attr('disabled', false);
        alert('Exportação falhou: cheque a conexão com a internet.')
    });

}


function popularTabela() {
    const headerCsv = localStorage.getItem('headers');
    const csv = fetchDataFromLocalStorage();

    if (!csv || !headerCsv) {
        return;
    }

    const lines = csv.split('\n');
    const headers = headerCsv.split(';');

    const counter = document.createElement('td');
    counter.innerText = '#';
    $('table thead tr.headers').append(counter);

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
        ${lines.length - 2}
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
    4: 'Concordo em parte',
    5: 'Concordo totalmente',
};


function aleatorizarFotos() {

    $('.fotos-container').children().each((index, element) => {
        element.style.order = Math.floor(Math.random() * 10000);
    });

}

$(() => {
    $('.concordancia input').on('input change', function (event) {
        $(event.target).next('span').text(respostasFrases[event.target.value]);
    });

    aleatorizarFotos();
});




function limparTudo() {
    if (prompt('Escreva limpar para apagar todos os dados (ATENÇÃO: ESSA AÇÃO NÃO PODE SER DESFEITA)').toLowerCase() == 'limpar') {
        localStorage.clear();
        alert('dados apagados com sucesso');
        window.location.reload();
    } else {
        alert('A confirmação falhou, tente novamente.');
    }
}


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