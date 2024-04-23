import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddContact } from "../apis/datafetch.js";

const Create = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); 
    setError(null);

    try {
      const response = await AddContact({
        fullName,
        email,
        phone,
      });
      console.log(response);
      if (response.includes("success")) {
        alert("Contact added successfully!");
        navigate("/"); 
      } else {
        setError(response); 
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      setError("An error occurred while adding the contact. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] w-[100%]">
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-[3rem]">Create Contact</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-[70%]">
        {/* Add validation logic to the input fields if needed */}
        <TextField
          label="Full Name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          margin="normal"
          fullWidth
          required
          type="email"
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          margin="normal"
          fullWidth
        />
        {isLoading && <CircularProgress sx={{ mt: 2 }} />}{" "}
       
        {error && <p className="text-red-500">{error}</p>}{" "}
      
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, disabled: isLoading }} 
        >
          New Contact
        </Button>
      </form>
    </div>
  );
};

export default Create;
