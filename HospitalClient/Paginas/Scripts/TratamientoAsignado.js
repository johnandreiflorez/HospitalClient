var data = {
    ID: 0,
    ID_Tratamiento: "",
    ID_Ingreso: "",
    Fecha_inicio: "",
    Fecha_fin: ""
};

$(document).ready(() => {
    Consultar();
    $("#btnIngresar").click(Ingresar)
    $("#btnActualizar").click(Actualizar)
    $("#btnEliminar").click(Eliminar)
    $("#btnLimpiar").click(limpiar)
    LlenarComboServicio("http://localhost:53689/Api/tratamiento/GetAll", "#cbotratamientoA", "Seleccione un paciente", false, "ID", "Nombre");
    LlenarComboServicio("http://localhost:53689/Api/Paciente/GetPacientes", "#cboIDIngreso", "Seleccione una paciente", false, "ID", "Nombre", "PATCH");
})

function Ingresar() {
    debugger;
    getData();
    var result = requestAjax("http://localhost:53689/Api/AsignacionTratamiento/Create", "POST", data);
    mensaje(true, "Se registro un ingreso del tratamiento con el ID: " + result.ID);
    Consultar();
}

function Actualizar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/AsignacionTratamiento/Edit", "PUT", data);
    mensaje(true, result);
    Consultar();
}

function Eliminar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/AsignacionTratamiento/Delete?id=" + data.ID, "DELETE");
    mensaje(false, "Se Elimino el Tratamiento Asignado con ID: " + result.ID);
    Consultar();
}

function Consultar() {
    LlenaTablaServicio("http://localhost:53689/Api/AsignacionTratamiento/GetAll", "#tblTratamientoA");
    asignarEventosTabla("#tblTratamientoA");
    limpiar();
}

function getData() {
    data.ID = $("#txtID").val();
    data.ID_Tratamiento = $("#cbotratamientoA").val();
    data.ID_Ingreso = $("#cboIDIngreso").val();
    data.Fecha_inicio = $("#txtFechaInicio").val();
    data.Fecha_fin = $("#txtFechaFin").val();
}

function ConsultarFila(DatosFila) {
    $("#txtID").val(DatosFila.find('td:eq(0)').text());
    setValueCombo("#cboIDIngreso", DatosFila.find('td:eq(1)').text());
    setValueCombo("#cbotratamientoA", DatosFila.find('td:eq(2)').text());
    $("#txtFechaInicio").val(DatosFila.find('td:eq(3)').text().split("T")[0]);
    $("#txtFechaFin").val(DatosFila.find('td:eq(4)').text().split("T")[0]);
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
    $("#cbotratamientoA").val(-1);
    $("#cboIDIngreso").val(-1);
    $("#txtFechaInicio").val("");
    $("#txtFechaFin").val("");
}