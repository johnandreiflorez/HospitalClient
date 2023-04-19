$(document).ready(() => {
    LlenarComboServicio("http://localhost:53689/Api/Especializacion/GetAll", "#cboEspecialidad", "Seleccione una Especializacion", false, "ID", "Nombre");
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
    "Teléfono": "",
    ID_Especializacion: ""
}


function getData() {
    data.ID = $("#txtID").val();
    data.Nombre = $("#txtNombre").val();
    data.Apellido = $("#txtApellido").val();
    data.Especialidad = $("#txtEspecialidad").val();
    data.Teléfono = $("#txtTelefono").val();
    data.Dirección = $("#txtDireccion").val();
    data.ID_Especializacion = $("#cboEspecialidad").val();
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
    setValueCombo("#cboEspecialidad", DatosFila.find('td:eq(3)').text());
    $("#txtDireccion").val(DatosFila.find('td:eq(4)').text());
    $("#txtTelefono").val(DatosFila.find('td:eq(5)').text());


}

function setValueCombo(idCombo, Valor) {
    let options = $(idCombo)[0].options;
    for (var i = 0; i < options.length; i++) {
        if (options[i].innerText == Valor) {
            $(idCombo).val(options[i].value);
        }
    }
}


function limpiar() {
    $("#txtID").val("");
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#cboEspecialidad").val(-1);
    $("#txtTelefono").val("");
    $("#txtDireccion").val("");
}