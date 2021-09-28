import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";

import { RootState } from "../../store";

const UserInfo = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  console.log("user", user);
  console.log("city", city, setCity);
    const submit = async (e: any) => {
      e.preventDefault();
      // const userRef = firestore.doc(`users-tp/${user}`);
      const userRef = firestore.collection('users-tp').doc(user?.id)

      try {
        await userRef.set({
          separate_mailling_address: {
            city: city,
            street: street,
          },
        },{merge:true});
      } catch (error) {
        console.log("Error in creating user", error);
      }
    };

  // const submit = () => {
  //   // const currentUserId = store.getState().auth.uid;
  //   const currentUserId = user?.id;

  //    firestore
  //     .collection("users-tp")
  //     .get()
  //     .then((usersSnapshot) => {
  //       usersSnapshot.forEach((doc) => {
  //         // looking for the current user and then updating their data
  //         if (doc.data().uid === currentUserId) {
  //           firestore.collection("users-tp").doc(doc.id).set(
  //             {
  //               separate_mailing_address: { city, street },
  //             },
  //             { merge: true }
  //           );
  //         }
  //       });
  //     });
  // };
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

export default UserInfo;
