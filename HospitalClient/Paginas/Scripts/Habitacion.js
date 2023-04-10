var data = {
    ID: 0,
    Tipo: "",
    Precio: 0
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
    data.Tipo = $("#txtTipo").val();
    data.Precio= $("#txtPrecio").val();
}

function Ingresar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Habitacion/Create", "POST", data);
    mensaje(true, "Se ingreso la habitación con el ID: " + result.ID);
    Consultar();
}

function Actualizar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Habitacion/Edit", "PUT", data);
    mensaje(true, result);
    Consultar();
}

function Eliminar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Habitacion/Delete?id=" + data.ID, "DELETE");
    mensaje(false, "Se Elimino la habitación del tipo: " + result.Tipo);
    Consultar();
}

function Consultar() {
    LlenaTablaServicio("http://localhost:53689/Api/Habitacion/GetAll", "#tblHabitacion");
    asignarEventosTabla("#tblHabitacion");
    limpiar();
}

function ConsultarFila(DatosFila) {
    $("#txtID").val(DatosFila.find('td:eq(0)').text());
    $("#txtTipo").val(DatosFila.find('td:eq(1)').text());
    $("#txtPrecio").val(DatosFila.find('td:eq(2)').text());
}
function limpiar() {
    $("#txtID").val("");
    $("#txtTipo").val("");
    $("#txtPrecio").val("");
}