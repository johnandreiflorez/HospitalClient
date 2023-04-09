var data = {
    ID: 0,
    Nombre: "",
    Apellido: "",
    Fecha_nacimiento: "",
    "Dirección": "",
    "Teléfono": ""
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
    data.Apellido = $("#txtApellido").val();
    data.Fecha_nacimiento = $("#txtFechaNacimiento").val();
    data.Teléfono = $("#txtTelefono").val();
    data.Dirección = $("#txtDireccion").val();
}

function Ingresar() {
    debugger;
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
    $("#txtTelefono").val(DatosFila.find('td:eq(5)').text());
    $("#txtDireccion").val(DatosFila.find('td:eq(4)').text());
}
function limpiar() {
    $("#txtID").val("");
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#txtFechaNacimiento").val("");
    $("#txtTelefono").val("");
    $("#txtDireccion").val("");
}