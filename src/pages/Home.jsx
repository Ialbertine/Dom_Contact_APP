import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, TextField, IconButton, Button } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material"; // Icons for buttons
import { FetchContacts } from "../apis/datafetch.js";
import { useNavigate } from "react-router-dom";



const columns = [
  { field: "id", headerName: "ID", width: 70 }, // Use 'id' field for unique identifier
  {
    field: "profilePic",
    headerName: "Profile",
    width: 70,
    renderCell: (params) => (
      <Avatar alt={params.row.fullName} src={params.row.profilePic} />
    ),
  },
  { field: "fullName", headerName: "Full Name", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "phone", headerName: "Phone", width: 130 },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    renderCell: (params) => (
      <>
        <IconButton
          onClick={() => {
            // Handle view contact logic here (e.g., navigate to a view contact page)
            console.log("View contact:", params.row);
          }}
        >
          <Edit fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => {
            // Handle delete contact logic here (e.g., confirmation dialog and API call)
            console.log("Delete contact:", params.row._id);
          }}
        >
          <Delete fontSize="small" color="error" />
        </IconButton>
      </>
    ),
  },
];

const initialContacts = []; // Empty array to hold fetched contacts

const Home = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchText, setSearchText] = useState("");
  const [filterData, setFilterData] = useState(contacts);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchContactsData = async () => {
      try {
        const fetchedContacts = await FetchContacts();
        setContacts(fetchedContacts);
        setFilterData(fetchedContacts); // Set initial filtered data
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContactsData();
  }, []);

  const handleSearch = (event) => {
    const newSearchText = event.target.value.toLowerCase();
    setSearchText(newSearchText);
    setFilterData(
      contacts.filter((contact) =>
        contact.fullName.toLowerCase().includes(newSearchText)
      )
    );
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset page to 1 when rows per page changes
  };
  const navigate = useNavigate();

  const handleAddContact = () => {
    navigate("/create"); // Navigate to the "/create" route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] w-[100%]">
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-[3rem]">Contacts List</h1>
      </div>
      <div className="flex justify-between w-[80%] lg:w-[90%]">
        <TextField
          label="Search Contacts"
          value={searchText}
          onChange={handleSearch}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddContact} // Call the handleAddContact function
        >
          Add Contact
        </Button>
      </div>
      <div className="flex flex-col items-center w-[80%] lg:w-[90%] h-[90vh] mt-4">
        <DataGrid
          rows={filterData.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )}
          columns={columns}
          pageSize={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
};

export default Home;
