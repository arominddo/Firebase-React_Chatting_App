import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";
import { useEffect, useRef, useState } from "react";
import { child, onChildAdded, ref as dbRef, off, onChildRemoved } from "firebase/database";
import { db } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message"
import { setUserPosts } from "../../../store/chatRoomSlice";
import Skeleton from "../../../components/Skeleton";

function MainPanel() {

    const messagesRef = dbRef(db, "messages");
    const typeingRef = dbRef(db, "typing");
    
    const [messages, setMessages] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(true);
    const [typingUsers, setTypingUsers] = useState([]);
    const {currentUser} = useSelector(state => state.user);
    const {currentChatRoom} = useSelector(state => state.chatRoom);
    
    const messageEndRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        messageEndRef.current.scrollIntoView({behavior : "smooth"});
    })

    useEffect(() => {

        if(currentChatRoom.id){
            addMessagesListener(currentChatRoom.id);
            addTypingListeners(currentChatRoom.id);
        }

        return () => {
            off(messagesRef);
        }

    }, [currentChatRoom.id])

    const addTypingListeners = (chatRoomId) => {
        let typingUsers = [];

        onChildAdded(child(typeingRef, chatRoomId), DataSnapshot => {
            if(DataSnapshot.key !== currentUser.uid){
                typingUsers = typingUsers.concat({
                    id : DataSnapshot.key,
                    name : DataSnapshot.val()
                });
                setTypingUsers(typingUsers);
            }
        })

        onChildRemoved(child(typeingRef, chatRoomId), DataSnapshot => {
            const index = typingUsers.findIndex(user => user.id === DataSnapshot.key);
            if(index !== -1){
                typingUsers = typingUsers.filter(user => user.id !== DataSnapshot.key);
                setTypingUsers(typingUsers)
            }

        })
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setSearchLoading(true);
        
        handleSearchMessage(event.target.value)
    }

    const handleSearchMessage = (searchTerm) => {
        const chatRoomMessages = [...messages];
        const regex = new RegExp(searchTerm, "gi");
        const searchResults = chatRoomMessages.reduce((acc, message) => {
            if(
                (message.content && message.content.match(regex)) ||
                message.user.name.match(regex)
            ){
                acc.push(message);
            }
            return acc;
        }, []);
        setSearchResults(searchResults);
        setSearchLoading(false);
    }

    const addMessagesListener = (chatRoomId) => {
        let messagesArray = [];

        setMessages([]);

        onChildAdded(child(messagesRef, chatRoomId), DataSnapshot => {
            messagesArray.push(DataSnapshot.val());
            const newMessageArray = [...messagesArray];

            setMessages(newMessageArray);
            setMessagesLoading(false);
            userPostsCount(newMessageArray);
        })
    };

    const userPostsCount = (messages) => {
        const userPost = messages.reduce((acc, message) => {
            if (message.user.name in acc) {
                acc[message.user.name].count += 1;
            }
            else {
                acc[message.user.name] = {
                    image : message.user.image,
                    count : 1,
                }
            }
            return acc;
        }, {});

        dispatch(setUserPosts(userPost));
    }

    const renderMessages = (messages) => {
        return (
            messages.length > 0 && messages.map((message) => {
                return (
                    <Message
                        key={message.timestamp}
                        message={message}
                        user={currentUser}
                    />
                )
            })
        )
    }

    const renderTypingUsers = (typingUsers) => {
        return (
            typingUsers.length > 0 &&
            typingUsers.map(user => (
                <span key={user.name.userUid}>
                    {user.name.userUid}님이 채팅을 입력하고 있습니다...
                </span>
            ))
        )
    }

    const renderMessageSkeleton = (loading) => {
        return (
            loading &&
            <>
            {[...Array(10)].map((_, i) => (
                <Skeleton key={i} />
            ))}
            </>
        )
    }

    return (
        <div style={{ padding: "2rem 2rem 0 2rem" }}>
            <MessageHeader handleSearchChange={handleSearchChange} />
            <div
                style={{
                    width: "100%",
                    height: 450,
                    border: "0.2rem solid #ececec",
                    borderRadius: "4px",
                    padding: "1rem",
                    marginBottom: "1rem",
                    overflowY: "auto",
                }}
            >
                {renderMessageSkeleton(messagesLoading)}
                {searchLoading && (<div>Loading...</div>)}
                { searchTerm ? renderMessages(searchResults) : renderMessages(messages)}
                {renderTypingUsers(typingUsers)}
                <div ref={messageEndRef} />
            </div>

            <MessageForm />
        </div>
    );
}

export default MainPanel;
