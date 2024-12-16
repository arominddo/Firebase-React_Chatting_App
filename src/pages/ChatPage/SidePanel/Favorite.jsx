import { child, onChildAdded, ref as dbRef, off, onChildRemoved } from "firebase/database";
import { FaRegSmileBeam } from "react-icons/fa";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatRoom, setPrivateChatRoom } from "../../../store/chatRoomSlice";

function Favorite() {

    const [favoriteChatRooms, setFavoriteChatRooms] = useState([]);
    const [activeChatRoomId, setActiveChatRoomId] = useState("");
    const usersRef = dbRef(db, "users");

    const {currentUser} = useSelector(state => state.user)

    const dispatch = useDispatch();

    useEffect(() => {

        if(currentUser?.uid){
            addListener(currentUser.uid);
        }

        return () => {
            removeListener(currentUser.uid);
        }

    }, [currentUser?.uid])

    const removeListener = (userId) => {
        off(child(usersRef, `${userId}/favorite`))
    }

    const addListener = (userId) => {
        let favoriteArray = [];
        onChildAdded(child(usersRef, `${userId}/favorite`), DataSnapshot => {
            favoriteArray.push({id : DataSnapshot.key, ...DataSnapshot.val()});
            const newFavoriteChatRooms = [...favoriteArray];

            setFavoriteChatRooms(newFavoriteChatRooms);
        })

        onChildRemoved(child(usersRef, `${userId}/favorite`), DataSnapshot => {
            const filteredChatRooms = favoriteArray.filter(chatRoom => {
                return chatRoom.id !== DataSnapshot.key;
            })
            favoriteArray = filteredChatRooms;
            setFavoriteChatRooms(filteredChatRooms);
        })
    }

    const changeChatRoom = (room) => {
        dispatch(setCurrentChatRoom(room));
        dispatch(setPrivateChatRoom(false));
        setActiveChatRoomId(room.id);
    };

    const renderFavoriteChatRooms = () => {
        return (
            favoriteChatRooms.length > 0 &&
            favoriteChatRooms.map((chatRoom) => (
                <li
                    key={chatRoom.id}
                    onClick={() => changeChatRoom(chatRoom)}
                    style={{
                        backgroundColor : activeChatRoomId === chatRoom.id ? "#ffffff45" : "",
                        cursor : "pointer",
                    }}
                >
                    # {chatRoom.name}
                </li>
            ))
        );
    }

    return (
    <div>
        <span style={{display : "flex", alignItems : "center"}}>
            <FaRegSmileBeam style={{marginRight : 3}} />
            FAVORITE
        </span>
        <ul style={{listStyleType : "none", padding : 0}}>
            {renderFavoriteChatRooms(favoriteChatRooms)}
        </ul>
    </div>
)
}

export default Favorite;
