import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { database } from "../firebase";
import UploadFile from "./UploadFile";

function Feed() {
    const { user, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState("");

    // for every user new eventlistner
    useEffect(() => {
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
            setUserData(snapshot.data());
        });
        return () => {
            unsub();
        };
    }, [user]);
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
            >
                <UploadFile user={userData} />
            </div>
        </>
    );
}

export default Feed;
