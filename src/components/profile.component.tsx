import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { User } from "../types/user.type";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  const [redirect, setRedirect] = useState<string | null>(null);
  const [userReady, setUserReady] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User & { accessToken: string }>({ accessToken: "" });

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) setRedirect("/home");
    setCurrentUser(currentUser);
    setUserReady(true);
  }, []);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="container">
      {userReady && (
        <div>
          <div className="container">
            <header className="jumbotron">
              <h2>
                <span className="bi bi-person-circle large-icon">
                  {" "}
                  Profile Id: {currentUser.id}{" "}
                </span>
              </h2>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Token:</strong>{" "}
                      {currentUser.accessToken.substring(0, 20)} ...
                    </p>
                    <p>
                      <strong>First Name:</strong> {currentUser.firstName}
                    </p>
                    <p>
                      <strong>Last Name:</strong> {currentUser.lastName}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Email:</strong> {currentUser.email}
                    </p>
                    <p>
                      <strong>Created At:</strong> {currentUser.createdAt}
                    </p>
                    <p>
                      <strong>Updated At:</strong> {currentUser.updatedAt}
                    </p>
                  </div>
                </div>
              </div>
            </header>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
