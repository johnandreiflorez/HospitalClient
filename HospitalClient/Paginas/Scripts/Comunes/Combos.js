function LlenarComboControlador(sURL, Comando, lstParametros, ComboLlenar) {
    var DatosCombo = {
        Comando: Comando,
        lstParametros
    }
    var promise;
    promise = $.ajax({
        type: "POST",
        url: sURL,
        contentType: "application/json",
        data: JSON.stringify(DatosCombo),
        dataType: "json",
        success: function (respuesta) {
            for (var op = 0; op < respuesta.length; op++) {
                $(ComboLlenar).append('<option value=' + respuesta[op].Valor + '>' + respuesta[op].Texto + '</option>');
            }
        }
    });
    return promise;
}
function LlenarComboDatos(respuesta, ComboLlenar) {
    for (var op = 0; op < respuesta.length; op++) {
        $(ComboLlenar).append('<option value=' + respuesta[op].Valor + '>' + respuesta[op].Texto + '</option>');
    }
}
function LlenarComboServicio(sURL, ComboLlenar, TextoSeleccione, async, value, text, type="GET") {
    $(ComboLlenar).empty();

    if (TextoSeleccione != "") {
        $(ComboLlenar).append('<option value=-1>' + TextoSeleccione + '</option>');
    }
    var promise;
    promise = $.ajax({
        type,
        url: sURL,
        contentType: "application/json",
        data: null,
        dataType: "json",
        async: async,
        success: function (respuesta) {
            if (!respuesta.length) {
                return "No hay datos";
            }
            let keys = Object.keys(respuesta[0]);
            let html = '';
            for (var op = 0; op < respuesta.length; op++) {
                let dataSet = '';
                keys.forEach(element => {
                    dataSet += `data-${element}="${respuesta[op][element]}"`;                })
                html += '<option ' + dataSet + 'value=' + respuesta[op][value] + '>' + respuesta[op][text] + '</option>';
            }
            $(ComboLlenar).append(html);
        }
    });
    return promise;
}