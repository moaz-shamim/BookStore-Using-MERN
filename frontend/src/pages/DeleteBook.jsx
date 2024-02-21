import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton, Spinner } from "../components";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully", { variant: "success" });

        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert("An Error happened . Please Check console");
        enqueueSnackbar("Error", { variant: "error" });

        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you Sure want to delete this book ?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete It.
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
