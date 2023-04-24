var data = {
    ID: 0,
    ID_Ingreso: "",
    Valor: "",
    FechaFacturacion: "",
    FechaPago: ""
};
let fechaActual = new Date().toISOString().split("T")[0];
let datatable = [];
$(document).ready(() => {
    LlenarComboServicio("http://localhost:53689/Api/Facturacion/GetAll", "#cboPaciente", "Seleccione un paciente", false, "IDIngreso", "Paciente");
    /*LlenarComboServicio("http://localhost:53689/Api/Habitacion/GetAll", "#cboHabitacion", "Seleccione una habitación", false, "ID", "Tipo");*/
    setearEventos();
    Consultar();
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
    datatable = requestAjax("http://localhost:53689/Api/Tratamiento/getTratamientos?ID=" + ID, "PATCH");
    LlenarTablaDatos(datatable, "#tblTratamientoAsignado");
}

function getDays() {
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
    var result = requestAjax("http://localhost:53689/Api/Facturacion/Create", "POST", data);
    mensaje(true, "Se registro un ingreso con el ID: " + result.ID);
    Consultar();
}

function Actualizar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Facturacion/Edit", "PUT", data);
    mensaje(true, result);
    Consultar();
}

function Eliminar() {
    getData();
    if (data.ID == 0 || !data.ID) {
        mensaje(false, "NO SE PUDO BORRAR EL REGISTRO, GARANTICE EL ID DE LA FACTURA");
        return;
    }
    var result = requestAjax("http://localhost:53689/Api/Facturacion/Delete?id=" + data.ID, "DELETE");
    mensaje(false, "Se Elimino el ingreso del Paciente con ID: " + result.ID);
    Consultar();
}

function Consultar() {
    LlenaTablaServicio("http://localhost:53689/Api/Facturacion/GetFacturados", "#tblFactura", "PATCH");
    asignarEventosTabla("#tblFactura");
    limpiar();
}

function getData() {
    data.ID = $("#txtID").val();
    data.ID_Ingreso = $("#cboPaciente").val();
    data.Valor = $("#txtValor").val();
    data.FechaFacturacion = $("#txtFechaSalida").val();
    data.FechaPago = $("#txtFechaPago").val();
}

function ConsultarFila(DatosFila) {
    $("#txtID").val(DatosFila.find('td:eq(0)').text());
}

function limpiar() {
    $("#txtID").val("");
    $("#cboPaciente").val(-1);
    $("#cboPaciente").html("");
    LlenarComboServicio("http://localhost:53689/Api/Facturacion/GetAll", "#cboPaciente", "Seleccione un paciente", false, "IDIngreso", "Paciente");
    $("#txtCedula").val("");
    $("#txtHabitacion").val("");
    $("#txtPrecioHabitacion").val("");
    $("#tblTratamientoAsignado tbody").remove();
    $("#txtFechaIngreso").val("");
    $("#txtFechaSalida").val("");
    $("#txtDias").val("");
    let fechaActual = new Date().toISOString().split("T")[0];
    $("#txtFechaPago").val(fechaActual);
    $("#txtValor").val("");

}