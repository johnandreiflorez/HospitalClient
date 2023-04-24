var data = {
    ID: 0,
    Tipo: "",
    Precio: 0,
    ID_Departamento: "",
    ID_Tipo_Habitacion: "",
    Piso: ""
};

$(document).ready(() => {
    Consultar();
    $("#btnIngresar").click(Ingresar)
    $("#btnActualizar").click(Actualizar)
    $("#btnEliminar").click(Eliminar)
    $("#btnLimpiar").click(limpiar)
    LlenarComboServicio("http://localhost:53689/Api/TipoHabitacion/GetAll", "#cboTipo", "Seleccione un tipo", false, "ID", "Nombre");
    LlenarComboServicio("http://localhost:53689/Api/Departamento/GetAll", "#cboDepartamento", "Seleccione un departamento", false, "ID", "Nombre");
})

function getData() {
    data.ID = $("#txtID").val();
    data.Tipo = $("#txtTipo").val();
    data.Precio = $("#txtPrecio").val();
    data.ID_Tipo_Habitacion = $('#cboTipo').val();
    data.ID_Departamento = $('#cboDepartamento').val();
    data.Piso = $('#txtPiso').val();
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
    if (data.ID == 0 || !data.ID) {
        mensaje(false, "NO SE PUDO BORRAR EL REGISTRO, GARANTICE EL ID DE LA HABITACION");
        return;
    }
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
    setValueCombo('#cboTipo', DatosFila.find('td:eq(1)').text());
    setValueCombo('#cboDepartamento', DatosFila.find('td:eq(2)').text());
    $("#txtPiso").val(DatosFila.find('td:eq(3)').text());
    $("#txtPrecio").val(DatosFila.find('td:eq(4)').text());
    $("#txtTipo").val(DatosFila.find('td:eq(5)').text());

}
function limpiar() {
    $("#txtID").val("");
    $("#txtTipo").val("");
    $("#txtPrecio").val("");
    $("#txtPiso").val("");
    $("#cboDepartamento").val(-1);
    $("#cboTipo").val(-1);
}