import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, Row, Table } from 'reactstrap';
import Base from '../../components/Base';
import ViewUserProfile from './ViewUserProfile';
import userContext from '../../context/userContext';
import { getUser } from '../../services/user-service';
import { getCurrentUserDetail } from '../../auth';
import UpdateUserProfile from './UpdateUserProfile';

function ProfileInfo() {
  const object = useContext(userContext);

  const [user, setUser] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);
  const { userId } = useParams();
  console.log("ID: ", userId);

  useEffect(() => {
    getUser(userId).then((data) => {
      console.log("User Data : ", data);
      setUser({ ...data });
    });
  }, []);

  const toggleUpdateFlag = (value) => {
    setUpdateFlag(value);
  };

  //show update profile
  const showUpdateProfile = () => {
    toggleUpdateFlag(true);
  };

  //show view profile
  const viewUpdateProfile = () => {
    toggleUpdateFlag(false);
  };

  /*  view user profile */
  const userView = () => {
    return <ViewUserProfile updateProfileClick={showUpdateProfile} user={user} />;
  };

  const viewUserProfile = () => {
    return (
      <div>
        {user ? userView() : 'Loading user Data...'}
      </div>
    );
  };

  // END view user Profile

  return (
    <Base>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Container>
            {updateFlag ? (
              <UpdateUserProfile user={user} />
            ) : (
              viewUserProfile()
            )}
          </Container>
        </Col>
      </Row>
    </Base>
  );
}

export default ProfileInfo;
