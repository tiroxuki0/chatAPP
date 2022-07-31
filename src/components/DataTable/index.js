import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 250 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "password", headerName: "Password", width: 250 },
];

const rows = [
  { id: 1, username: "Snow", email: "Jon", password: 35 },
  { id: 2, username: "Lannister", email: "Cersei", password: 42 },
  { id: 3, username: "Lannister", email: "Jaime", password: 45 },
  { id: 4, username: "Stark", email: "Arya", password: 16 },
  { id: 5, username: "Targaryen", email: "Daenerys", password: 45 },
  { id: 6, username: "Melisandre", email: "HEHEHEH", password: 150 },
  { id: 7, username: "Clifford", email: "Ferrara", password: 44 },
  { id: 8, username: "Frances", email: "Rossini", password: 36 },
  { id: 9, username: "Roxie", email: "Harvey", password: 65 },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: "80%", margin: `15px auto` }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
