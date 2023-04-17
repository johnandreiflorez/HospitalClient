function LlenaTablaServicio(sURLServicio, TablaLlenar, type ="GET") {
    var promise;
    promise = $.ajax({
        type,
        url: sURLServicio,
        contentType: "application/json",
        data: null,
        dataType: "json",
        async: false,
        success: function (respuesta) {
            var columns = [];
            columnNames = Object.keys(respuesta[0]);
            CrearEncabezado(TablaLlenar ,columnNames);
            for (var i in columnNames) {
                columns.push({
                    data: columnNames[i],
                    title: columnNames[i]
                });
            }

            $(TablaLlenar).DataTable({
                data: respuesta,
                columns: columns,
                destroy: true
            });
        }
    });
    return promise;
}

function CrearEncabezado(Id, datos) {
    $(Id).html("");
    var encabezado = "<thead><tr>"
    for (var i = 0; i < datos.length; i++) {
        encabezado += `<th> ${datos[i]} </th>`;
    }
    encabezado += "</tr></thead>";
    $(Id).append(encabezado);
}

function LlenarTablaControlador(sURL, Comando, lstParametros, TablaLlenar) {
    var DatosGrid = {
        Comando: Comando,
        lstParametros
    };
    var promise;
    promise = $.ajax({
        type: "POST",
        url: sURL,
        contentType: "application/json",
        data: JSON.stringify(DatosGrid),
        dataType: "json",
        success: function (respuesta) {
            var columns = [];
            columnNames = Object.keys(respuesta[0]);
            for (var i in columnNames) {
                columns.push({
                    data: columnNames[i],
                    title: columnNames[i]
                });
            }

            $(TablaLlenar).DataTable({
                data: respuesta,
                columns: columns,
                destroy: true
            });
        }
    });
    return promise;
}

function LlenarTablaDatos(respuesta, TablaLlenar) {
    var columns = [];
    columnNames = Object.keys(respuesta[0]);
    for (var i in columnNames) {
        columns.push({
            data: columnNames[i],
            title: columnNames[i]
        });
    }

    $(TablaLlenar).DataTable({
        data: respuesta,
        columns: columns,
        destroy: true
    });
}