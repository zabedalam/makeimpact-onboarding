import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";

import { RootState } from "../../store";

const UserDetails = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [iso_code, setIso_code] = useState("");
  const [countryName, setCountryName] = useState("");
  console.log("user", user);

  const submit = async (e: any) => {
    e.preventDefault();
    const userRef = firestore.doc(`users-tp/${user}`);
    try {
      await userRef.set({
        country: {
          iso_code: iso_code,
          countryName: countryName,
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
          placeholder="ios_code"
          value={iso_code}
          onChange={(e) => setIso_code(e.target.value)}
        />
        <input
          type="text"
          placeholder="CountryName"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
        />
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

export default UserDetails;
