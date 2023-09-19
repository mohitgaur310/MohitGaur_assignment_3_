import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import '../App.css'
const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const getUsers = async () => {
    const data = await fetch("http://localhost:3000/users");
    const json = await data.json(); 
    setUsersData(json);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteUser = (userId) => {
    
    console.log('In users lifting the state up');
    fetch(`http://localhost:3000/user/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
        console.log('In users lifting the state up');
          setUsersData((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } else {
          console.error('Error deleting user:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className="userDiv" >
      {usersData?.map((user,index) => (
        <UserCard key={user.email}  onDeleteUser={handleDeleteUser} user1={user} index={index} />
      ))}
    </div>
  );
};

export default Users;
