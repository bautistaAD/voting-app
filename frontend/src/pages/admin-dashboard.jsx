import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import Navbar from "../components/navbar";

function AdminDashboard() {
  const username = localStorage.getItem("username");

  return (
    <div>
      <Navbar displayName={username}></Navbar>
    </div>
  );
}

export default AdminDashboard;
