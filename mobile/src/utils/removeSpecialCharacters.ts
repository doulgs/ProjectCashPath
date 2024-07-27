export function removeSpecialCharacters(input: string) {
  // Remove tudo que não é um dígito numérico ou letra
  return input.replace(/[^a-zA-Z0-9]/g, "");
}
