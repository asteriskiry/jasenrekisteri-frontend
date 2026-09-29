function csvField(value) {
    const stringValue =
        value === null || value === undefined ? '' : String(value);
    // Treat formula prefixes (including whitespace/control-character evasions)
    // as text. Quote every field so delimiters cannot introduce another cell.
    const unsafe =
        /^[\s\p{Cc}]*[=+\-@＝＋－＠]/u.test(stringValue) ||
        /^[\t\r\n]/.test(stringValue);
    const safeValue = unsafe ? `'${stringValue}` : stringValue;
    return `"${safeValue.replace(/"/g, '""')}"`;
}

export function buildCsv(columns, rows) {
    const header = columns.map((column) => csvField(column.text));
    const lines = rows.map((row) =>
        columns.map((column) => csvField(row[column.dataField]))
    );

    return [header, ...lines].map((line) => line.join(',')).join('\r\n');
}

export function exportToCsv(filename, columns, rows) {
    const csvContent = buildCsv(columns, rows);
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
