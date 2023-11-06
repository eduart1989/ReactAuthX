import React, { useState, useEffect } from "react";
import {getPublicContent} from "../services/user.service";
import { User } from "../types/user.type";
import { AnimatedText } from "./animated/animated-text";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const [content, setContent] = useState<string>("");
  const [userReady, setUserReady] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User >({});

  useEffect(() => {
   getPublicContent().then(
      (data) => {
        setCurrentUser(data);
        setUserReady(true);
        setContent("login");
      },
      (error) => {
        setUserReady(false);
        setContent(`User is ${error.response.data.message}!`);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        {userReady ? (
          <div>
            <i className="bi bi-house-door" style={{ fontSize: "2rem" }}></i>
            <AnimatedText
              name={`Welcome, ${currentUser.firstName} ${currentUser.lastName}!`}
            />
            <p>Custom content for authenticated users.</p>
          </div>
        ) : (
          <div>
            <i className="bi bi-house-door" style={{ fontSize: "2rem" }}></i>
            <AnimatedText name={content} />
            <p>Custom content for authenticated users.</p>
          </div>
        )}
      </header>
    </div>
  );
};

export default Home;
