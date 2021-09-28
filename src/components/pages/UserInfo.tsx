import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";

import { RootState } from "../../store";

const UserDetails = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  console.log("user", user);

  const submit = async (e: any) => {
    e.preventDefault();
    const userRef = firestore.doc(`users-tp/${user}`);
    try {
      await userRef.set({
        separate_mailling_address: {
          city: city,
          street: street,
        },
      });
    } catch (error) {
      console.log("Error in creating user", error);
    }
  };
  return (
    <div>
      <div className="App__form">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

export default UserDetails;
