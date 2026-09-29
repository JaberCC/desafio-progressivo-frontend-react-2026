export default function formatarPreco(valorEmCentavos) {
  const centavos = valorEmCentavos % 100;
  const reais = (valorEmCentavos - centavos) / 100;
  let textoCentavos = "" + centavos;
  if (centavos < 10) {
    textoCentavos = "0" + centavos;
  }
  return "R$ " + reais + "," + textoCentavos;
}
