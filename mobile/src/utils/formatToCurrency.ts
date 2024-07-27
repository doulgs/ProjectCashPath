/**
 * Função para formatar um número como moeda brasileira (BRL)
 * @param value - O valor numérico a ser formatado
 * @returns Uma string formatada como moeda brasileira exemplo R$ 1.000,00
 */
export function formatToCurrency(value: number): string {
  return value
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    .replace("R$", "R$ ");
}
