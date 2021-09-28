import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";

import { RootState } from "../../store";

const UserDetails = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [iso_code, setIso_code] = useState("");
  const [countryName, setCountryName] = useState("");
  console.log("user", user);
  //   console.log('iso',iso_code,setIso_code)

  const submit = async (e: any) => {
    e.preventDefault();
    // const userRef = firestore.doc(`users-tp/${user?.id}`);
  //   const currentUserId = user?.id;
    const userRef = firestore.collection('users-tp').doc(user?.id)

    try {
      await userRef.set({
        country: {
          iso_code: iso_code,
          countryName: countryName,
        },
      },{merge:true});
    } catch (error) {
      console.log("Error in creating user", error);
    }
  };

  // const submit = () => {
  //   // const currentUserId = store.getState().auth.uid;
  //   const currentUserId = user?.id;
  //   // console.log('currentuser',currentUserId)

  //     firestore
  //     .collection("users-tp")
  //     .get()
  //     .then((usersSnapshot) => {
  //        usersSnapshot.forEach((doc) => {
  //         // looking for the current user and then updating their data
  //         if (doc.data().uid === currentUserId) {
  //           firestore
  //             .collection("users-tp")
  //             .doc(doc.id)
  //             .set({
  //               country: {iso_code, countryName }
  //             },{merge:true});
  //         }
  //       });
  //     });
  // };

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
