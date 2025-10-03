import React, { useState, useMemo } from "react";

const DataTable = ({
  columns,
  data,
  showSearch = true,
  showAddButton = true,
  addButtonText = "Add",
  onAdd,
}) => {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      columns.some((col) => {
        const value = row[col.accessor];
        return value
          ? value.toString().toLowerCase().includes(search.toLowerCase())
          : false;
      })
    );
  }, [search, data, columns]);

  return (
    <div>
      {(showSearch || showAddButton) && (
        <div className="d-flex justify-content-between mb-3">
          {showSearch && (
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          {showAddButton && (
            <button className="btn btn-primary ms-2" onClick={onAdd}>
              {addButtonText}
            </button>
          )}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <tr key={row._id || rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex}>
                      {col.render
                        ? col.render(row[col.accessor], row, rowIndex)
                        : typeof row[col.accessor] === "object"
                          ? JSON.stringify(row[col.accessor])
                          : row[col.accessor] ?? ""}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center text-muted">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;