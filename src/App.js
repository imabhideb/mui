import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EditableTable() {
  const [rows, setRows] = React.useState([]);
  const [editingRowId, setEditingRowId] = React.useState(null);

  const handleEdit = (rowId) => {
    setEditingRowId(rowId);
  };

  const handleSave = (rowId) => {
    setEditingRowId(null);
  };

  const handleCancel = () => {
    setEditingRowId(null);
  };

  const handleDelete = (rowId) => {
    const updatedRows = rows.filter((row) => row.id !== rowId);
    setRows(updatedRows);
  };

  const handleIssueChange = (e, rowIndex) => {
    const updatedRows = rows.map((row) => {
      if (row.id === rowIndex) {
        return { ...row, issue: e.target.value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleStatusChange = (e, rowIndex) => {
    const updatedRows = rows.map((row) => {
      if (row.id === rowIndex) {
        return { ...row, status: e.target.value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newRow = { id: Date.now(), issue: '', status: '' };
    setRows([...rows, newRow]);
    setEditingRowId(newRow.id); // Automatically start editing the newly added row
  };

  return (
    <div>
      <h1 >Bugs Issue portal</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>ISSUES</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>STATUS</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {editingRowId === row.id ? (
                    <Input value={row.issue} onChange={(e) => handleIssueChange(e, row.id)} />
                  ) : (
                    row.issue
                  )}
                </TableCell>
                <TableCell>
                  {editingRowId === row.id ? (
                    <Select value={row.status} onChange={(e) => handleStatusChange(e, row.id)}>
                      <MenuItem value="Done">Done</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Todo">To Do</MenuItem>
                    </Select>
                  ) : (
                    row.status
                  )}
                </TableCell>
                <TableCell>
                  {editingRowId === row.id ? (
                    <>
                      <Button variant="outlined" size="small" onClick={() => handleSave(row.id)}>
                        Save
                      </Button>
                      <Button variant="outlined" size="small" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outlined" size="small" onClick={() => handleEdit(row.id)}>
                        Edit
                      </Button>
                      <Button variant="outlined" size="small" onClick={() => handleDelete(row.id)}>
                        <DeleteIcon />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="outlined" size="small" onClick={handleAddRow}>
          Add Row
        </Button>
      </TableContainer>
    </div>
  );
}
