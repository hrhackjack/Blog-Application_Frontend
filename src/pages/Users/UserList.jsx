import React, { useState, useEffect, useMemo } from 'react';
import { getAllUsers } from '../../services/user-service';
import { toast } from 'react-toastify';
import Base from '../../components/Base';
import { getCurrentUserDetail } from '../../auth'
import UserCard from './UserCard';
import { Col, Container, Row } from 'reactstrap';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getAllUsers()
      .then(data => {
        console.log("Loading Users ")
        console.log(data)
        if (isMounted) {
          setUsers([...data])
        }
      })
      .catch(error => {
        console.log(error);
        toast.error("Error in Loading Users!")
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const currentUser = useMemo(() => getCurrentUserDetail(), []);

  return (
    <Base>
      <Container>
        <Row>
          {users.map(user => (
            (currentUser && currentUser.id === user.id) ? null : (
              <Col key={user.id} className='mb-4' xs={12} sm={6} md={4} lg={3} xl={3}>
                <UserCard {...user} />
              </Col>
            )
          ))}
        </Row>
      </Container>
    </Base>
  );
}

export default UserList;
