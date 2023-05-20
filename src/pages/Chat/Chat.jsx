import React, { useEffect, useState, useMemo} from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import "./Chat.css";
import { BASE_URL } from "../../services/helper";
import Base from '../../components/Base';
import { getCurrentUserDetail } from '../../auth';
import { useNavigate } from 'react-router-dom';


var stompClient = null;

const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: '',
    name:'',
    receiver: '',
    connected: false,
    message: ''
  });

  const currentUser = useMemo(() => getCurrentUserDetail(), []);
  const navigate = useNavigate();  
  const [userNames, setUserNames] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function getNameByUsername(username) {
    try {
      const response = await fetch(`${BASE_URL}/users/name/${username}`);
      if (!response.ok) {
        throw new Error('Failed to retrieve name');
      }
      const name = await response.text();
      return name;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  async function fetchUserNames(usernames) {
    const namePromises = usernames.map((username) => getNameByUsername(username));
    const names = await Promise.all(namePromises);
    const userNamesMap = usernames.reduce((acc, username, index) => {
      acc[username] = names[index];
      return acc;
    }, {});
    setUserNames(userNamesMap);
    setIsLoading(false);
    console.log(userNamesMap);
  }

  useEffect(() => {
    const usernames = [...privateChats.keys()];
    fetchUserNames(usernames);
  }, [privateChats]);

  useEffect(() => {
    if (currentUser) {
      setUserData(prevState => ({ ...prevState, username: currentUser.email, name: currentUser.name }));
    }
  }, [currentUser]);

  useEffect(() => {
    if (userData.username !== '') {
      connect();
    }
  }, [userData.username]);

  useEffect(() => {
    console.log("UserData:", userData);
  }, [userData]);

  const connect = () => {
    let Sock = new SockJS('http://localhost:7989/chat');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };


    const onConnected = () => {
        setUserData({...userData,"connected": true});
        //   console.log("OnConnectedUD:", userData)
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        userJoin();
    }

    const userJoin=()=>{
          var chatMessage = {
            sender: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        console.log("onReceived:",payloadData);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.sender)){
                    privateChats.set(payloadData.sender,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
            default:
                console.log(`Unexpected status: ${payloadData.status}`);
                break;
        }
    }
    
    const onPrivateMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
            console.log("onPrivate:",payloadData);
        if(privateChats.get(payloadData.sender)){
            privateChats.get(payloadData.sender).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.sender,list);
            setPrivateChats(new Map(privateChats));
        }
    }



    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendValue=()=>{
            if (stompClient) {
                var chatMessage = {
                sender: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              console.log(chatMessage);
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
            sender: userData.username,
            receiver:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser = () => {
        if (currentUser) {
          setUserData({ ...userData, "username": currentUser.name });
          console.log(currentUser + "-->" + currentUser.name);
          connect();
        }
    };

    return (
        <Base>
            <div className="container">
                {userData.connected?
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            <li
                            onClick={() => setTab("CHATROOM")}
                            className={`member ${tab === "CHATROOM" && "active"}`}
                            >
                            ChatRoom
                            </li>
                            {console.log("PC:",privateChats)}
                            {isLoading ? (
                            <p>Loading...</p>
                            ) : (
                            [...privateChats.keys()].map((username) => (
                                <li
                                onClick={() => setTab(username)}
                                className={`member ${tab === username && "active"}`}
                                key={username}
                                >
                                {username === userData.username
                                    ? userData.name
                                    : userNames[username] || username}
                                </li>
                            ))
                            )}
                        </ul>
                        </div>

                    {tab==="CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {publicChats.map((chat,index)=>(
                                <li className={`message ${chat.sender === userData.username && "self"}`} key={index}>
                                    {chat.sender !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    {chat.sender === userData.username && <div className="avatar self">{userData.name}</div>}
                                    <div className="message-data">{chat.message}</div>
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="Enter the message..." value={userData.message} onChange={handleMessage} /> 
                            <button type="button" className="send-button" onClick={sendValue}>Send</button>
                        </div>
                    </div>}
                    {tab!=="CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {[...privateChats.get(tab)].map((chat,index)=>(
                                <li className={`message ${chat.sender === userData.username && "self"}`} key={index}>
                                    {chat.sender !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.sender === userData.username && <div className="avatar self">{userData.name}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message mt-5">
                            <input type="text" className="input-message" placeholder="Enter the message..." value={userData.message} onChange={handleMessage} /> 
                            <button type="button" className="send-button" onClick={sendPrivateValue}>Send</button>
                        </div>
                    </div>}
                </div>
                :
                <div className="register mt-5 mb-5">
                    <button type="button" onClick={() => navigate('/login')}>
                            Connect
                    </button> 
                </div>}
            </div>
        </Base>
    )
}

export default ChatRoom
