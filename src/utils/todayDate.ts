export function newDate() {
  const date = new Date();
  const dia = String(date.getDate());
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = String(date.getFullYear());
  const currentlyData = `${ano}-${mes}-${dia}`;
  return currentlyData;
}
