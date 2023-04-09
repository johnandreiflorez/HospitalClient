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
function LlenarComboServicio(sURL, ComboLlenar, TextoSeleccione, async, value, text) {
    $(ComboLlenar).empty();

    if (TextoSeleccione != "") {
        $(ComboLlenar).append('<option value=-1>' + TextoSeleccione + '</option>');
    }
    var promise;
    promise = $.ajax({
        type: "GET",
        url: sURL,
        contentType: "application/json",
        data: null,
        dataType: "json",
        async: async,
        success: function (respuesta) {
            for (var op = 0; op < respuesta.length; op++) {
                $(ComboLlenar).append('<option value=' + respuesta[op][value] + '>' + respuesta[op][text] + '</option>');
            }
        }
    });
    return promise;
}