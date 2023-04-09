function FormatoMiles(Valor) {
    return "$ " + Intl.NumberFormat('es-CO').format(Valor);
}