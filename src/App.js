import "./styles.css";
import { useEffect, useState, useRef } from "react";

const URL = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [userChat, setUserChat] = useState("");
  const divRef = useRef(null);

  const fetchApi = async () => {
    const response = await fetch(URL);
    let data = await response.json();
    setPosts(data);
  };

  const ScrollFunc = () => {
    let scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    window.scrollTo(0, scrollHeight, { behavior: "smooth" });
  };

  useEffect(() => {
    fetchApi();
    setTimeout(() => {
      ScrollFunc();
    }, 3000);
  }, []);

  useEffect(() => {
    ScrollFunc();
  }, [posts]);

  const updateChat = async () => {
    if (userChat === "") return;
    let newChat = {
      userId: 11,
      id: 11,
      title: "User Msg",
      body: userChat
    };

    let newArr = await [...posts, newChat];
    setPosts(newArr);
    setUserChat("");
  };

  return (
    <div className="App">
      <main className="layout">
        <div className="header">
          <img
            alt="pp"
            style={{ borderRadius: "50px" }}
            height="50px"
            width="50px"
            src="https://lh3.googleusercontent.com/ogw/AOh-ky2dSvzfUaoSVKl1BYN8aIRV7aJKL1fVM5i3Pr6UqaU=s32-c-mo"
          />
          <span style={{ fontSize: "30px" }}>Vinod</span>
          <span style={{ fontSize: "50px" }}>&#9993;</span>
        </div>
        <div className="msgBody">
          {posts ? (
            posts.map((item, index) => {
              return item.id % 2 === 0 ? (
                <div className="left-chat" key={index}>
                  <section className="chat">
                    <span>{item.title}</span>
                    <hr style={{ width: "100%" }} />
                    <span>{item.body}</span>
                  </section>
                </div>
              ) : (
                <div className="right-chat" key={index}>
                  <section className="chat">
                    <span>{item.title}</span>
                    <hr style={{ width: "100%" }} />
                    <span>{item.body}</span>
                  </section>
                </div>
              );
            })
          ) : (
            <div>
              <h2>Loading...</h2>
            </div>
          )}
        </div>
        <div className="inputBox">
          <input
            ref={divRef}
            type="text"
            className="inputBoxText"
            placeholder="Type here..."
            value={userChat}
            onChange={(e) => setUserChat(e.target.value)}
          />
          <button className="sendIcon" onClick={updateChat}>
            send
          </button>
        </div>
      </main>
    </div>
  );
}
