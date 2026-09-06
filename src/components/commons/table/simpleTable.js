import React, { useMemo, useState } from 'react';

function normalize(value) {
    if (typeof value === 'string') {
        return value.toLowerCase();
    }
    if (typeof value === 'boolean') {
        return value ? 1 : 0;
    }
    return value;
}

function compareValues(a, b) {
    const normalizedA = normalize(a);
    const normalizedB = normalize(b);

    if (normalizedA < normalizedB) {
        return -1;
    }
    if (normalizedA > normalizedB) {
        return 1;
    }
    return 0;
}

const SimpleTable = ({
    keyField,
    data,
    columns,
    defaultSort,
    searchQuery,
    rowEvents,
    className,
}) => {
    const [sortState, setSortState] = useState(defaultSort);

    const handleHeaderClick = (column) => {
        if (!column.sort) {
            return;
        }
        setSortState((current) =>
            current.dataField === column.dataField
                ? {
                      dataField: column.dataField,
                      order: current.order === 'asc' ? 'desc' : 'asc',
                  }
                : { dataField: column.dataField, order: 'asc' }
        );
    };

    const rows = useMemo(() => {
        const query = (searchQuery || '').toLowerCase();

        const filtered = query
            ? data.filter((row) =>
                  columns.some((column) =>
                      String(row[column.dataField])
                          .toLowerCase()
                          .includes(query)
                  )
              )
            : data;

        const sorted = [...filtered].sort((a, b) => {
            const result = compareValues(
                a[sortState.dataField],
                b[sortState.dataField]
            );
            return sortState.order === 'asc' ? result : -result;
        });

        return sorted;
    }, [data, columns, searchQuery, sortState]);

    return (
        <table
            className={['table', 'table-striped', 'table-hover', className]
                .filter(Boolean)
                .join(' ')}
        >
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.dataField}
                            style={{
                                textAlign: column.headerAlign,
                                cursor: column.sort ? 'pointer' : undefined,
                                ...column.headerStyle,
                            }}
                            onClick={() => handleHeaderClick(column)}
                        >
                            {column.text}
                            {column.sort &&
                            sortState.dataField === column.dataField
                                ? sortState.order === 'asc'
                                    ? ' ▲'
                                    : ' ▼'
                                : ''}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr
                        key={row[keyField]}
                        onClick={
                            rowEvents && rowEvents.onClick
                                ? () => rowEvents.onClick(row)
                                : undefined
                        }
                    >
                        {columns.map((column) => (
                            <td
                                key={column.dataField}
                                style={{
                                    textAlign: column.align,
                                    ...column.style,
                                }}
                            >
                                {column.formatter
                                    ? column.formatter(
                                          row[column.dataField],
                                          row
                                      )
                                    : row[column.dataField]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SimpleTable;
