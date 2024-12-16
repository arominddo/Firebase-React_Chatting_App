import { onChildAdded, ref as dbRef } from "firebase/database";
import { FaRegSmile } from "react-icons/fa";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DirectMessages = () => {
    
    const usersRef = dbRef(db, "users");

    const [users, setUsers] = useState([]);
    const [activeChatRoomId, setActiveChatRoomId] = useState("");

    const {currentUser} = useSelector(state => state.user);

    useEffect(() => {
        
        if(currentUser?.uid){
            addUsersListener(currentUser.uid)
        }
        
        return () => {

        }
    }, [currentUser?.uid])

    const addUsersListener = (currentUserId) => {
        let usersArray = [];

        onChildAdded(usersRef, DataSnapshot => {
            if(currentUserId !== DataSnapshot.key){
                let user = DataSnapshot.val();
                user["uid"] = DataSnapshot.key;
                usersArray.push(user);

                const newUsersArray = [...usersArray];
                setUsers(newUsersArray);
            }
        })
    }

    const renderDirectMessages = users => {
        return (
            users.length > 0 &&
            users.map(user => (
                <li key={user.uid}
                style={{
                    backgroundColor : user.uid === activeChatRoomId ? "#ffffff45" : ""
                }}
                >
                    # {user.name}
                </li>
            )    
            )

        )
        
    }
    
    return (
        <div>
            <span style={{ display : "flex", alignItems : "center" }}>
                <FaRegSmile style={{ marginRight: 3 }} />
                DIRECT MESSAGES
            </span>
            <ul style={{listStyleType : "none", padding : 0}}>
                {renderDirectMessages(users)}
            </ul>
        </div>
    );
};

export default DirectMessages;
