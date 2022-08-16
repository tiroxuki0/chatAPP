import * as React from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const rows = [
  { id: 1, username: "Snow", email: "Jon", admin: false, password: 35 },
  { id: 2, username: "Lannister", email: "Cersei", admin: false, password: 42 },
  { id: 3, username: "Lannister", email: "Jaime", admin: false, password: 45 },
  { id: 4, username: "Stark", email: "Arya", admin: false, password: 16 },
  {
    id: 5,
    username: "Targaryen",
    email: "Daenerys",
    admin: false,
    password: 45,
  },
  {
    id: 6,
    username: "Melisandre",
    email: "HEHEHEH",
    admin: false,
    password: 150,
  },
  { id: 7, username: "Clifford", email: "Ferrara", admin: false, password: 44 },
  { id: 8, username: "Frances", email: "Rossini", admin: false, password: 36 },
  { id: 9, username: "Roxie", email: "Harvey", admin: false, password: 65 },
];

const StyledBox = styled(Box)(({ theme }) => ({
  height: 500,
  width: "100%",
  "& .MuiDataGrid-cell--editing": {
    backgroundColor: "rgb(255,215,115, 0.19)",
    color: "#1a3e72",
    "& .MuiInputBase-root": {
      height: "100%",
    },
  },
  "& .Mui-error": {
    backgroundColor: `rgb(126,10,15, ${
      theme.palette.mode === "dark" ? 0 : 0.1
    })`,
    color: theme.palette.error.main,
  },
}));

const StyledPaper = styled(Paper)`
  .MuiDataGrid-virtualScroller {
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #888;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
`;

export default function DataTable() {
  const handleDeleteUser = async (params) => {
    console.log(params);
  };

  const apiRef = useGridApiRef();

  const processRowUpdate = (newRow, oldRow) => {
    console.log("newRow: ", newRow);
    console.log("oldRow: ", oldRow);
    const updatedRow = { ...newRow, isNew: false };
    return updatedRow;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Username", editable: true, width: 200 },
    { field: "email", headerName: "Email", editable: true, width: 200 },
    { field: "password", headerName: "Password", editable: true, width: 200 },
    {
      field: "admin",
      headerName: "Admin",
      type: "boolean",
      width: 100,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => {
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button>
              <EditIcon sx={{ color: "#8bc34a" }} />
            </Button>
            <Button onClick={() => handleDeleteUser(params)}>
              <DeleteIcon sx={{ color: "#9e9e9e" }} />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <StyledPaper>
      <StyledBox>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(err) => console.log(err)}
          hideFooterSelectedRowCount
          editMode="row"
          experimentalFeatures={{ newEditingApi: true }}
        />
      </StyledBox>
    </StyledPaper>
  );
}
