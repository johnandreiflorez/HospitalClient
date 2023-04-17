var data = {
    ID: 0,
    Nombre: "",
    Apellido: "", 
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
    data.Teléfono = $("#txtTelefono").val();
    data.Dirección = $("#txtDireccion").val();
}

function Ingresar() {
    debugger;
    getData();
    var result = requestAjax("http://localhost:53689/Api/Enfermera/Create", "POST", data);
    mensaje(true, "Se ingreso la enfermera con el ID: " + result.ID);
    Consultar();
}

function Actualizar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Enfermera/Edit", "PUT", data);
    mensaje(true, result);
    Consultar();
}

function Eliminar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Enfermera/Delete?id=" + data.ID, "DELETE");
    mensaje(false, "Se Elimino la enfermera con el Nombre: " + result.Nombre + "\n Apellido: " + result.Apellido);
    Consultar();
}

function Consultar() {
    LlenaTablaServicio("http://localhost:53689/Api/Enfermera/GetAll", "#tblEnfermera");
    asignarEventosTabla("#tblEnfermera");
    limpiar();
}

function ConsultarFila(DatosFila) {
    $("#txtID").val(DatosFila.find('td:eq(0)').text());
    $("#txtNombre").val(DatosFila.find('td:eq(1)').text());
    $("#txtApellido").val(DatosFila.find('td:eq(2)').text());    
    $("#txtTelefono").val(DatosFila.find('td:eq(4)').text());
    $("#txtDireccion").val(DatosFila.find('td:eq(3)').text());
}
function limpiar() {
    $("#txtID").val("");
    $("#txtNombre").val("");
    $("#txtApellido").val("");  
    $("#txtTelefono").val("");
    $("#txtDireccion").val("");
}