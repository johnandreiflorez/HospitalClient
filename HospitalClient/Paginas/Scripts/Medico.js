$(document).ready(() => {
    Consultar();
    $("#btnIngresar").click(Ingresar);
    $("#btnActualizar").click(Actualizar);
    $("#btnEliminar").click(Eliminar);
    $("#btnLimpiar").click(limpiar);


});

var data = {
    ID: 0,
    Nombre: "",
    Apellido: "",
    Especialidad: "",
    "Dirección": "",
    "Teléfono": ""
}


function getData() {
    data.ID = $("#txtID").val();
    data.Nombre = $("#txtNombre").val();
    data.Apellido = $("#txtApellido").val();
    data.Especialidad = $("#txtEspecialidad").val();
    data.Teléfono = $("#txtTelefono").val();
    data.Dirección = $("#txtDireccion").val();
}

function Ingresar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Medico/Create", "POST", data);
    mensaje(true, "Se ingreso el Medico con el ID: " + result.ID);
    Consultar();
}

function Actualizar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Medico/Edit", "PUT", data);
    mensaje(true, result);
    Consultar();
}

function Eliminar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Medico/Delete?id=" + data.ID, "DELETE");
    mensaje(false, "Se Elimino el Medico con el Nombre: " + result.Nombre + "\n Apellido: " + result.Apellido);
    Consultar();
}

function Consultar() {
    LlenaTablaServicio("http://localhost:53689/Api/Medico/GetAll", "#tblMedico");
    asignarEventosTabla("#tblMedico");
    limpiar();
}

function ConsultarFila(DatosFila) {
    $("#txtID").val(DatosFila.find('td:eq(0)').text());
    $("#txtNombre").val(DatosFila.find('td:eq(1)').text());
    $("#txtApellido").val(DatosFila.find('td:eq(2)').text());
    $("#txtEspecialidad").val(DatosFila.find('td:eq(3)').text());
    $("#txtTelefono").val(DatosFila.find('td:eq(5)').text());
    $("#txtDireccion").val(DatosFila.find('td:eq(4)').text());
}
function limpiar() {
    $("#txtID").val("");
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#txtEspecialidad").val("");
    $("#txtTelefono").val("");
    $("#txtDireccion").val("");
}