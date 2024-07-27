export function cpfRemoveMask(cpf: string | undefined): string {
  if (!cpf || cpf === "undefined") {
    return "CPF não disponivel";
  }

  // Lógica para remover máscara
  return cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/, "$1.***.***-$4"); // Remover não-dígitos
}
