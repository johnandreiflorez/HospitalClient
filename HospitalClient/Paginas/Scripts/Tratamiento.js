var data = {
    ID: 0,
    Nombre: "",
    "Descrición": "",
    Costo: 0
};

$(document).ready(() => {
    Consultar();
    $("#btnIngresar").click(Ingresar)
    $("#btnActualizar").click(Actualizar)
    $("#btnEliminar").click(Eliminar)
    $("#btnLimpiar").click(limpiar)
})

function getData() {
    data.ID = $("#txtID").val();
    data.Nombre = $("#txtNombre").val();
    data.Costo = $("#txtCosto").val();
    data.Descrición = $("#txtDescripcion").val();
}

function Ingresar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Tratamiento/Create", "POST", data);
    mensaje(true, "Se ingreso el tratamiento con el ID: " + result.ID);
    Consultar();
}

function Actualizar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Tratamiento/Edit", "PUT", data);
    mensaje(true, result);
    Consultar();
}

function Eliminar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Tratamiento/Delete?id=" + data.ID, "DELETE");
    mensaje(false, "Se Elimino el tratamiento con el nombre: " + result.Nombre);
    Consultar();
}

function Consultar() {
    LlenaTablaServicio("http://localhost:53689/Api/Tratamiento/GetAll", "#tblTratamientos");
    asignarEventosTabla("#tblTratamientos");
    limpiar();
}

function ConsultarFila(DatosFila) {
    $("#txtID").val(DatosFila.find('td:eq(0)').text());
    $("#txtNombre").val(DatosFila.find('td:eq(1)').text());
    $("#txtDescripcion").val(DatosFila.find('td:eq(2)').text());
    $("#txtCosto").val(DatosFila.find('td:eq(3)').text());
}
function limpiar() {
    $("#txtID").val("");
    $("#txtNombre").val("");
    $("#txtDescripcion").val("");
    $("#txtCosto").val("");
}