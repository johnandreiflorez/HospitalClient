var data = {
    ID: 0,
    Nombre: "",
    Apellido: "",
    Fecha_nacimiento: "",
    "Dirección": "",
    "Teléfono": "",
    Cedula: 0,
    ID_Tipo_Documento: ""
};

$(document).ready(() => {
    Consultar();
    $("#btnIngresar").click(Ingresar)
    $("#btnActualizar").click(Actualizar)
    $("#btnEliminar").click(Eliminar)
    $("#btnLimpiar").click(limpiar)
    LlenarComboServicio("http://localhost:53689/Api/TipoDocumento/GetAll", "#cboTipoDocumento", "Seleccione un tipo", false, "ID", "Nombre");
})

function getData() {
    data.ID = $("#txtID").val();
    data.Nombre = $("#txtNombre").val();
    data.Apellido = $("#txtApellido").val();
    data.Fecha_nacimiento = $("#txtFechaNacimiento").val();
    data.Teléfono = $("#txtTelefono").val();
    data.Dirección = $("#txtDireccion").val();
    data.Cedula = $('#txtDocumento').val();
    data.ID_Tipo_Documento = $('#cboTipoDocumento').val();
}

function Ingresar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Paciente/Create", "POST", data);
    mensaje(true, "Se ingreso el paciente con el ID: " + result.ID);
    Consultar();
}

function Actualizar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Paciente/Edit", "PUT", data);
    mensaje(true, result);
    Consultar();
}

function Eliminar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Paciente/Delete?id=" + data.ID, "DELETE");
    mensaje(false, "Se Elimino el paciente con el Nombre: " + result.Nombre + "\n Apellido: " + result.Apellido);
    Consultar();
}

function Consultar() {
    LlenaTablaServicio("http://localhost:53689/Api/Paciente/GetAll", "#tblPaciente");
    asignarEventosTabla("#tblPaciente");
    limpiar();
}

function ConsultarFila(DatosFila) {
    $("#txtID").val(DatosFila.find('td:eq(0)').text());
    $("#txtNombre").val(DatosFila.find('td:eq(1)').text());
    $("#txtApellido").val(DatosFila.find('td:eq(2)').text());
    $("#txtFechaNacimiento").val(DatosFila.find('td:eq(3)').text().split("T")[0]);
    $("#txtTelefono").val(DatosFila.find('td:eq(4)').text());
    $("#txtDireccion").val(DatosFila.find('td:eq(5)').text());
    setValueCombo("#cboTipoDocumento", DatosFila.find('td:eq(6)').text());
    $("#txtDocumento").val(DatosFila.find('td:eq(7)').text());

}
function limpiar() {
    $("#txtID").val("");
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#txtFechaNacimiento").val("");
    $("#txtTelefono").val("");
    $("#txtDireccion").val("");
    $("#txtCedula").val("");
    $("#cboTipoDocumento").val(-1);
}