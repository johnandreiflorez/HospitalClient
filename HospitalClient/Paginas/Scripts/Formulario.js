$(document).ready(function () {
    let page;
    if (location.href.includes("?")) {
      page = location.href.split("?")[1];
    } else {
      page = "Home";
    }
    $("#content").load("../Paginas/"+ page +".html");
    document.addEventListener("click",menu)
})
function menu(e) {
    let page = e.target.dataset.page;
    if (page) {
        $("#content").html("");
        $("#content").load("../Paginas/" + page + ".html");
    }
}

function requestAjax(url, type, data = null) {
    let dataR = data ? JSON.stringify(data) : null;
    let result;
    $.ajax({
        type: type,
        url: url,
        contentType: "application/json",
        data: dataR,
        dataType: "json",
        async: false,
        success: function (respuesta) {
            result = respuesta;
        },
        error: function (error) {
            mensaje(false, error.responseJSON.ExceptionMessage);
        }
    });
    return result;
}

function mensaje(type, message) {
    let clase = type == true ? 'alert-success' : 'alert-danger'
    $("#dvMensaje").addClass(`alert ${clase}`);
    $("#dvMensaje").html(message);
}

function asignarEventosTabla(idTabla) {
    $(`${idTabla} tbody tr`).ready(() => {
        var oTabla = $(idTabla).DataTable();
        $(`${idTabla} tbody`).on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                oTabla.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                ConsultarFila($(this).closest('tr'));
            }
        });
    })
}

function setValueCombo(idCombo, Valor) {
    let options = $(idCombo)[0].options;
    for (var i = 0; i < options.length; i++) {
        if (options[i].innerText == Valor) {
            $(idCombo).val(options[i].value);
        }
    }
}