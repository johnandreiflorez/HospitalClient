$(document).ready(() => {
    LlenarComboServicio("http://localhost:53689/Api/Medico/GetAll", "#cboMedico", "Seleccione un Medico", false, "ID", "Nombre");
    LlenarComboServicio("http://localhost:53689/Api/Enfermera/GetAll", "#cboEnfermera", "Seleccione una Enfermera", false, "ID", "Nombre");
    LlenarComboServicio("http://localhost:53689/Api/Paciente/GetAll", "#cboPaciente", "Seleccione un paciente", false, "ID", "Nombre");
    LlenarComboServicio("http://localhost:53689/Api/Ingreso/GetAll", "#cboIngreso", "Seleccione el ingreso", false, "Paciente", "Fecha_Ingreso");
    LlenarComboServicio("http://localhost:53689/Api/Ingreso/GetAll", "#cboIngreso2", "Seleccione el ingreso", false, "Paciente", "ID");
    Consultar();
    $("#cboPaciente").change((e) => {
    
        $("#cboIngreso").val(e.target.selectedOptions[0].innerText);
        $("#cboIngreso2").val(e.target.selectedOptions[0].innerText);
    });
    $("#txtFecha").val(new Date().toISOString().split("T")[0]);
    $("#btnIngresar").click(Ingresar)
    $("#btnActualizar").click(Actualizar)
    $("#btnEliminar").click(Eliminar)
    $("#btnLimpiar").click(limpiar)
    
    
});

var data = {
    ID: 0,
    ID_Medico: "",
    ID_Enfermera: "",
    ID_Paciente: "",
    ID_Ingreso: "",
    Fecha: "",
    Notas: ""
};

function getData() {
    data.ID = $("#txtID").val();
    data.ID_Medico = $("#cboMedico").val();
    data.ID_Enfermera = $("#cboEnfermera").val();
    data.ID_Paciente = $("#cboPaciente").val();
    data.ID_Ingreso = $("#cboIngreso2")[0].selectedOptions[0].innerText
    data.Fecha = $("#txtFecha").val();
    data.Notas = $("#txtNota").val();
}

function Ingresar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Atencion/Create", "POST", data);
    mensaje(true, "Se registro la Atencion con el ID: " + result.ID);
    Consultar();
}

function Actualizar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Atencion/Edit", "PUT", data);
    mensaje(true, result);
    Consultar();
}

function Eliminar() {
    getData();
    var result = requestAjax("http://localhost:53689/Api/Atencion/Delete?id=" + data.ID, "DELETE");
    mensaje(false, "Se Elimino la atencion " + result.ID);
    Consultar();
}

function Consultar() {
    LlenaTablaServicio("http://localhost:53689/Api/Atencion/GetAll", "#tblAtencion");
    asignarEventosTabla("#tblAtencion");
    limpiar();
}

function ConsultarFila(DatosFila) {
    $("#txtID").val(DatosFila.find('td:eq(0)').text());
    setValueCombo("#cboMedico", DatosFila.find('td:eq(1)').text());
    setValueCombo("#cboEnfermera", DatosFila.find('td:eq(2)').text());
    setValueCombo("#cboPaciente", DatosFila.find('td:eq(3)').text());
    setValueCombo("#cboIngreso", DatosFila.find('td:eq(4)').text());
   // $("#cboIngreso2")[0].selectedOptions[0].innerText
    $("#txtFecha").val(DatosFila.find('td:eq(5)').text().split("T")[0]);
    $("#txtNota").val(DatosFila.find('td:eq(6)').text());
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
    $("#cboMedico").val(-1);
    $("#cboEnfermera").val(-1);
    $("#cboPaciente").val(-1);
    $("#cboIngreso").val(-1);
    $("#cboIngreso2").val(-1);
    $("#txtFecha").val("");
    $("#txtNota").val("");
}