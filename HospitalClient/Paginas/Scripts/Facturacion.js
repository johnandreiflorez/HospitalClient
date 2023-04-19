var data = {
    ID: 0,
    ID_Paciente: "",
    ID_Habitacion: "",
    Fecha_ingreso: "",
    Fecha_salida: ""
};
let fechaActual = new Date().toISOString().split("T")[0];
let datatable = [];
$(document).ready(() => {
    LlenarComboServicio("http://localhost:53689/Api/Facturacion/GetAll", "#cboPaciente", "Seleccione un paciente", false, "IDIngreso", "Paciente");
    /*LlenarComboServicio("http://localhost:53689/Api/Habitacion/GetAll", "#cboHabitacion", "Seleccione una habitación", false, "ID", "Tipo");*/
    setearEventos();
});

function setearEventos() {
    $("#cboPaciente").change(infoPaciente);
    setTimeout(() => {
        $('#txtFechaSalida').val(fechaActual);
        $('#txtFechaPago').val(fechaActual);
    },500)
    $('#txtFechaSalida').change(getDays);
    $('#fechaIngreso').change(getDays);
    Consultar();
    $("#btnIngresar").click(Ingresar)
    $("#btnActualizar").click(Actualizar)
    $("#btnEliminar").click(Eliminar)
    $("#btnLimpiar").click(limpiar);
    $("#pagado2").change((e) => {
        setFechaPago(!e.target.checked)
    })

    $("#pagado1").change((e) => {
        setFechaPago(e.target.checked)
    })

}

function setFechaPago(sw) {
    if (sw)
        $('#txtFechaPago').val(fechaActual);
    else
        $('#txtFechaPago').val("");
    document.getElementById('txtFechaPago').disabled = sw
}
function ConsultarTratamientosAsignados() {
    let ID = $("#cboPaciente").val();
    datatable = requestAjax("http://localhost:53689/Api/Facturacion/getTratamientos?ID=" + ID, "PATCH");
    LlenarTablaDatos(datatable, "#tblTratamientoAsignado");
}

function getDays() {
    debugger;
    let fechaIngreso = new Date($("#txtFechaIngreso").val());
    let fechaSalida = new Date($("#txtFechaSalida").val());
    if (fechaSalida && fechaIngreso) {
        let dias = Math.round((fechaSalida - fechaIngreso) / (1000 * 60 * 60 * 24))
        $("#txtDias").val(dias);
        getValorFacturacion(dias);
    }
}

function getValorFacturacion(dias) {
    let valorTratamientos = 0;
    datatable.forEach(element => {
        valorTratamientos += element.Valor;
    })
    let valorHabitacion = $("#txtPrecioHabitacion").val();
    $("#txtValor").val(dias * valorHabitacion + valorTratamientos) ;
}

function infoPaciente(e) {
    let dataPaciente = e.target.selectedOptions[0].dataset;
    $('#txtCedula').val(dataPaciente.cedula);
    $('#txtFechaIngreso').val(dataPaciente.fechaingreso);
    $('#txtHabitacion').val(dataPaciente.habitacion);
    $('#txtPrecioHabitacion').val(dataPaciente.preciohabitacion);
    ConsultarTratamientosAsignados();
    getDays();
}

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
    $("#cboPaciente").val(-1);
    $("#cboHabitacion").val(-1);
    $("#txtFechaIngreso").val("");
    $("#txtFechaSalida").val("");
}