function csvField(value) {
    const stringValue =
        value === null || value === undefined ? '' : String(value);
    if (/[",\n]/.test(stringValue)) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
}

export function exportToCsv(filename, columns, rows) {
    const header = columns.map((column) => csvField(column.text));
    const lines = rows.map((row) =>
        columns.map((column) => csvField(row[column.dataField]))
    );

    const csvContent = [header, ...lines]
        .map((line) => line.join(','))
        .join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
