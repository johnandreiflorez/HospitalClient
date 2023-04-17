var data = {
    ID: 0,
    Nombre: "",
    "Descripción": "",
    Costo: 0
};
var dataMedicamento = []

$(document).ready(() => {
    $("#btnIngresar").click(Ingresar)
    $("#btnActualizar").click(Actualizar)
    $("#btnEliminar").click(Eliminar)
    $("#btnLimpiar").click(limpiar)
    $("#btnMedicamentos").click(addTable);
    LlenarComboServicio("http://localhost:53689/Api/Medicamento/GetAll", "#cboMedicamento", "Seleccione un Medicamento", false, "ID", "Nombre");
    Consultar();
})

function addTable() {
    let value = $('#cboMedicamento').val();
    if (!value || value == "-1") {
        mensajeMedicamento(false, "Seleccione un medicamento");
        return;
    }
    if (dataMedicamento.find(x => x.ID_Medicamento == value)) {
        mensajeMedicamento(false, "El medicamento ya fue agregado");
        return;
    }
    let obj = {
        ID_Medicamento: value, Medicamento: document.getElementById('cboMedicamento').selectedOptions[0].innerText}
    dataMedicamento.push(obj);
    LlenarTablaDatos(dataMedicamento, "#tblMedicamentos");
    mensajeMedicamento(true, "El medicamento fue agregado");
    $('#cboMedicamento').val(-1);
}

function getData() {
    data.ID = $("#txtID").val();
    data.Nombre = $("#txtNombre").val();
    data.Costo = $("#txtCosto").val();
    data.Descripción = $("#txtDescripcion").val();
}
function mensajeMedicamento(type, message) {
    let clase = type == true ? 'alert-success' : 'alert-danger'
    $("#dvMensajeMedicamentos").addClass(`alert ${clase}`);
    $("#dvMensajeMedicamentos").html(message);
    setTimeout(() => {
        $("#dvMensajeMedicamentos").removeClass(`alert`);
        $("#dvMensajeMedicamentos").html("");
    }, 4000)
}
function Ingresar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Tratamiento/Create", "POST", data);
    dataMedicamento.map(x => x.ID_Tratamiento = result.ID);
    var result2 = requestAjax("http://localhost:53689/Api/MedicamentoTratamiento/Create", "POST", dataMedicamento);
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
    getData();
    let dataValueMedicamento = requestAjax('http://localhost:53689/Api/MedicamentoTratamiento/GetAll?ID=' + data.ID, 'GET')
    if (dataValueMedicamento.length > 0) {
        LlenarTablaDatos(dataValueMedicamento, "#tblMedicamentos");
    }
}

function limpiar() {
    $("#txtID").val("");
    $("#txtNombre").val("");
    $("#txtDescripcion").val("");
    $("#txtCosto").val("");
    $("#tblMedicamentos tbody").remove();
}