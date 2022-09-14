import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, updateUsername } from "../../features/Users";

const index = () => {
  const userList = useSelector((state) => state.users.value);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Add Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Add Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button
          onClick={() => {
            dispatch(
              addUser({
                id: userList[userList.length - 1].id + 1,
                name,
                username,
              })
            );
          }}
        >
          Add user
        </button>
      </div>

      <div>
        {userList.map((user, key) => {
          return (
            <div key={key} style={{ background: "#ebebeb " }}>
              <h2>{user.name}</h2>
              <h3>{user.username}</h3>
              <input
                type="text"
                placeholder="Enter New username"
                onChange={(event) => {
                    setNewUsername(event.target.value);
                }}
              />
              <button onClick={() => {dispatch(updateUsername({id: user.id, username: newUsername}))}}>Update Username</button>
              <button
                onClick={() => {
                  dispatch(deleteUser({ id: user.id }));
                }}
              >
                Delete User
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default index;
