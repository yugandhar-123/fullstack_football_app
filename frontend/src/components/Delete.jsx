



import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AxiosInstance from "./Axios";
import { useNavigate, useParams } from "react-router-dom";
import MyMessage from "./form/Message";

const Delete = () => {
  const MyParameter = useParams();
  const myId=MyParameter.id;
  const navigate = useNavigate();
  // const { id: myId } = useParams(); // ✅ Destructure directly

  const [message, setMessage] = useState({ text: null, color: null });
  const [myData, setMyData] = useState({
    name: "",
    description: "",
    country: "",
    league: "",
    attendance: 0,
    city: "",
    characteristic: [],
  });

  // ✅ useCallback prevents GetData from being re-created on every render
  const GetData = useCallback(() => {
    AxiosInstance.get(`footballclub/${myId}`)
      .then((res) => {
        setMyData(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch record:", error);
        setMessage({ text: "Failed to load record data.", color: "red" });
      });
  }, [myId]);

  useEffect(() => {
    GetData();
  }, [GetData]); // ✅ Proper dependency

  const DeleteRecord = (event) => {
    event.preventDefault(); // ✅ event is correctly received from onSubmit

    AxiosInstance.delete(`footballclub/${myId}`)
      .then(() => {
        setMessage({
          text: "You successfully deleted the record!",
          color: "green",
        });

        // ✅ No formik.resetForm() — Formik is not used here
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.error("Delete failed:", error);
        setMessage({ text: "Failed to delete the record.", color: "red" });
      });
  };

  return (
    <div>
      <form onSubmit={DeleteRecord}>
        {message.text && (
          // <MyMessage text={message.text} color={message.color} />
          // ✅ Correct — match what MyMessage.jsx actually expects
          <MyMessage messageText={message.text} messageColor={message.color} />
        )}

        <Box className={"TopBar"}>
          <DeleteIcon /> {/* ✅ More semantically appropriate icon */}
          <Typography
            sx={{ marginLeft: "15px", fontWeight: "bold" }}
            variant="subtitle1"
          >
            Are you sure you want to delete this record?
          </Typography>
        </Box>

        <Box className={"TextBox"}>
          <Typography variant="h6">
            You will be deleting the club:
            <strong> {myData.name}</strong> from{" "}
            {/* ✅ lowercase <strong>, not <Strong> */}
            <strong>{myData.city}</strong>
          </Typography>
        </Box>

        <Box sx={{ marginTop: "30px" }}>
          <Button type="submit" variant="contained" color="error" fullWidth>
            Delete
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Delete;