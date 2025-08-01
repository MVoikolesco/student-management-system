export function maskCPF(value: string): string {
  const cleanValue = value.replace(/\D/g, '')
  
  return cleanValue
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export function unmaskCPF(value: string): string {
  return value.replace(/\D/g, '')
}