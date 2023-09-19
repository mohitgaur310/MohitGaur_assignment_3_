import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import $ from 'jquery';
import "../App.css";

const ModelCard = ({ user, dataid ,openModel }) => {
  const [open, setOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState(false);
  
  const [userData, setUserData] = useState({});

  useEffect(() => {
    console.log('Component Rendered');  
    setOpen(openModel);
    setUserData(user);
    if(userData!==user) {
        setUserData(user)
    }
  }, [user]);
  
  const handleUserInput = (e) => {
    const { id, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedUserData = await response.json();
      
     setUserData({...updatedUserData})
      setUpdatedData(!updatedData)
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const handleOk = (e) => {
    setOpen(false);
    handleSubmit(e);
    if(userData){
    $('#'+dataid).find('.userName').html(userData.name || '')
    $('#'+dataid).find('.userEmail').html(userData.email || '')
    $('#'+dataid).find('.userPhone').html(userData.phone || '')
    $('#'+dataid).find('.userWebsite').html(userData.website || '')
    }
};
  const handleCancel = (e) => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        className="modelUser"
        title="Basic Modal"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: false,
        }}
        cancelButtonProps={{
          disabled: false,
        }}
      >
        <form onSubmit={handleSubmit}>
          <label className="labelCard">
            
            <span style={{ color: "red" }}> *</span> Name:
          </label>
          <input
            id="name"
            onChange={handleUserInput}
            className="inputCard"
            style={{ marginLeft: "15px" }}
            type="text"
            value={userData.name}
          />
          <br />
          <label className="labelCard">
            <span style={{ color: "red" }}> *</span> Email:
          </label>
          <input
            id="email"
            onChange={handleUserInput}
            type="text"
            className="inputCard"
            style={{ marginLeft: "22px" }}
            value={userData.email}
          />
          <br />
          <label className="labelCard">
            <span style={{ color: "red" }}> *</span> Phone:
          </label>
          <input
            id="phone"
            type="text"
            onChange={handleUserInput}
            style={{ marginLeft: "11px" }}
            className="inputCard"
            value={userData.phone}
          />
          <br />
          <label className="labelCard">
            <span style={{ color: "red" }}> *</span> Website:{" "}
          </label>
          <input
            type="text"
            id="website"
            onChange={handleUserInput}
            className="inputCard"
            value={userData.website}
          />
          <br />
        </form>
        <hr style={{ marginTop: "30px" }}></hr>
      </Modal>
    </>
  );
};
export default ModelCard;
