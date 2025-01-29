"use client";

import { useForm } from "react-hook-form";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Container, Box, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

type FormData = {
  text: string;
  dropdown: string;
  date: string;
};

export default function FormPage() {
  const [response, setResponse] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post("/api/submit", data);
      setResponse(res.data.message);
    } catch (error) {
      setResponse("Error submitting form");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h5" gutterBottom>
          Material UI Form
        </Typography>

        {/* Text Input */}
        <TextField
          label="Text Input"
          fullWidth
          margin="normal"
          {...register("text")}
        />

        {/* Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Dropdown</InputLabel>
          <Select {...register("dropdown")} defaultValue="">
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
          </Select>
        </FormControl>

        {/* Date Picker */}
        <TextField
          type="date"
          label="Select Date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          {...register("date")}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>

        {response && (
          <Typography variant="body1" sx={{ mt: 2, p: 1, bgcolor: "green.100" }}>
            {response}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
