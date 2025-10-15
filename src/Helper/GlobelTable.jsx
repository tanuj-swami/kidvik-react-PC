import React from "react";
import { Table, Button } from "react-bootstrap";

const CustomTable = ({ 
  columns = [],        
  data = [],          
  onEdit,              
  onDelete,            
  showActions = true,  
  actionLabels = { edit: "✏️ Edit", delete: "🗑 Delete" },
}) => {
  return (
    <div className="table-responsive">
      <Table bordered hover className="align-middle shadow-sm mt-3">
        <thead className="table-light text-center">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.label}</th>
            ))}
            {showActions && <th style={{ minWidth: "140px" }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{col.accessor ? col.accessor(row) : row[col.key]}</td>
                ))}

                {showActions && (
                  <td className="text-center">
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                      {onEdit && (
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => onEdit(rowIndex, row)}
                          className="d-flex align-items-center gap-1"
                        >
                          <span className="d-none d-md-inline">{actionLabels.edit}</span>
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDelete(rowIndex, row)}
                          className="d-flex align-items-center gap-1"
                        >
                           <span className="d-none d-md-inline">{actionLabels.delete}</span>
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (showActions ? 1 : 0)} className="text-center text-muted">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomTable;
