import XLSX from 'xlsx';
import format from 'date-fns/format';
import { apiGet } from './api';

export const exportExpenses = async () => {
  try {
    const { data } = await apiGet('/expenses/export');

    const headers = ['Datum', 'Kostnad', 'Beskrivning', 'Typ', 'Service', 'Kategori', 'Återkommande', 'Id'];
    const columnsWidth = [15, 15, 35, 25, 25, 25, 15, 25];
    const filename = `expenses_${format(new Date(), 'YYYYMMDD-HHmmss')}.xlsx`;
    const sheetname = 'Expenses';

    const rows = data.expenses.map(row => [
      row.date,
      row.cost,
      row.description,
      row.type && row.type.label,
      row.service && row.service.label,
      row.category && row.category.label,
      row.recurring,
      row.id,
    ]);
    const sheet = [].concat([headers], rows);

    if (sheet && Array.isArray(sheet) && Array.isArray(sheet[0])) {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(sheet);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetname);
      worksheet['!cols'] = columnsWidth.map(w => ({ wch: w }));

      // Skapa fil och starta nerladdning.
      XLSX.writeFile(workbook, filename);
    }

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};

export function importExpenses() {}
