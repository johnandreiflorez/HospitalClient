var data = {
    ID: 0,
    ID_Paciente: "",
    ID_Habitacion: "",
    Fecha_ingreso: "",
    Fecha_salida: ""
};

$(document).ready(() => {
    Consultar();
    $("#btnIngresar").click(Ingresar)
    $("#btnActualizar").click(Actualizar)
    $("#btnEliminar").click(Eliminar)
    $("#btnLimpiar").click(limpiar)
    LlenarComboServicio("http://localhost:53689/Api/Paciente/GetAll", "#cboPaciente", "Seleccione un paciente", false, "ID", "Nombre");
    LlenarComboServicio("http://localhost:53689/Api/Habitacion/GetAll", "#cboHabitacion", "Seleccione una habitación", false, "ID", "Tipo");
});

function Ingresar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Ingreso/Create", "POST", data);
    mensaje(true, "Se registro un ingreso con el ID: " + result.ID);
    Consultar();
}

function Actualizar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Ingreso/Edit", "PUT", data);
    mensaje(true, result);
    Consultar();
}

function Eliminar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Ingreso/Delete?id=" + data.ID, "DELETE");
    mensaje(false, "Se Elimino el ingreso del Paciente con ID: " + result.ID_Paciente);
    Consultar();
}

function Consultar() {
    LlenaTablaServicio("http://localhost:53689/Api/Ingreso/GetAll", "#tblIngresos");
    asignarEventosTabla("#tblIngresos");
    limpiar();
}

function getData() {
    data.ID = $("#txtID").val();
    data.ID_Paciente = $("#cboPaciente").val();
    data.ID_Habitacion = $("#cboHabitacion").val();
    data.Fecha_ingreso = $("#txtFechaIngreso").val();
    data.Fecha_salida = $("#txtFechaSalida").val();
}

function ConsultarFila(DatosFila) {
    $("#txtID").val(DatosFila.find('td:eq(0)').text());
    setValueCombo("#cboPaciente", DatosFila.find('td:eq(1)').text());
    setValueCombo("#cboHabitacion", DatosFila.find('td:eq(2)').text());
    $("#txtFechaIngreso").val(DatosFila.find('td:eq(3)').text().split("T")[0]);
    $("#txtFechaSalida").val(DatosFila.find('td:eq(4)').text().split("T")[0]);
}

function limpiar() {
    $("#txtID").val("");
    $("#cboPaciente").val(-1);
    $("#cboHabitacion").val(-1);
    $("#txtFechaIngreso").val("");
    $("#txtFechaSalida").val("");
}