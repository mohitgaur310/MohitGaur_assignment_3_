
import $ from 'jquery';
import React, { useEffect, useState } from "react";
import { Card } from "antd";
import "../App.css";
import {
  DeleteOutlined,
  EditOutlined,
  GlobalOutlined,
  HeartFilled,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import ModelCard from "./ModelCard";

const UserCard = ({ index, user1,onDeleteUser  }) => {
  const [heartShape, setHeartShape] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [user,setUser]=useState({})
  const handleHeart = () => {
    setHeartShape(!heartShape);
  };
  var vleu =null
  const handeEditUser = (e) => {

    setShowModel(!showModel);
     vleu=$(e.currentTarget).attr('mainid'); 
      console.log(vleu);
  };
  useEffect(()=>{
    setUser(user1)
  },[])
  const handleDelete = (e) => {
    const userId=user._id
    
    const main=$(e.currentTarget).attr('mainid')
    console.log(main);

    $('.mainUserCard').length > 1 ? $('#'+main).remove() : window.location.reload()
    // onDeleteUser(userId);
  };
  return (
    <div id={"userDetails_" + index} className="mainUserCard">
      <Card
        style={{ width: 350 }}
        cover={
          <img
            style={{ height: "200px", backgroundColor: "#D3D3D3" }}
            alt="example"
            src={`https://avatars.dicebear.com/v2/avataaars/${user.name}.svg?options[mood][]=happy`}
          />
        }
      >
        <div
          style={{
            textAlign: "left",
            position: "relative",
            left: "60%",
            width: "300px",
          }}
        >
          <p
            className="userName"
            style={{
              marginTop: -10,
              fontWeight: "bold",
              marginLeft: "-65%",
              marginBottom: "10px",
            }}
          >
            {user.name}
          </p>
          <p
            className="userEmail"
            style={{ marginTop: -10, marginLeft: "-65%", marginBottom: "10px" }}
          >
            <MailOutlined /> {user.email}
          </p>
          <p
            className="userPhone"
            style={{ marginTop: -10, marginLeft: "-65%", marginBottom: "10px" }}
          >
            <PhoneOutlined /> {user.phone}
          </p>
          <p
            className="userWebsite"
            style={{ marginTop: -10, marginLeft: "-65%", marginBottom: "9px" }}
          >
            <GlobalOutlined /> {user.website}
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#D3D3D3",
            width: "340px",
            height: "60px",
            marginLeft: "-20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              padding: "10px",
            }}
          >
            <div className="heartDiv" onClick={handleHeart}>
              {heartShape ? (
                <HeartFilled className="heartShape" />
              ) : (
                <HeartOutlined className="heartShape" />
              )}
            </div>
            <div
              style={{
                height: "40px",
                width: "100px",
                fontSize: "20px",
                color: "gray",
                borderRight: "solid 1px black",
                cursor: "pointer",
              }}
            >
              <EditOutlined 
                mainid={"userDetails_"+index}
                className="editDeleteShape"
                onClick={handeEditUser}
              />
              {showModel && <ModelCard user={user} dataid={"userDetails_"+index} openModel={true} />}
            </div>
            <div
              style={{
                height: "40px",
                width: "100px",
                fontSize: "20px",
                color: "gray",
                cursor: "pointer",
              }}
            >
              <DeleteOutlined  mainid={"userDetails_"+index} onClick={handleDelete} 
              
              className="editDeleteShape" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserCard;
