import React, { useState, useEffect, useMemo } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Container, Row, Table } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../../auth'
import { BASE_URL } from "../../services/helper"
import "./Profile.css"



const ViewUserProfile = ({ user, updateProfileClick }) => {


    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const currentUser = useMemo(() => getCurrentUserDetail(), []);

    useEffect(() => {
        fetch(`${BASE_URL}/users/${currentUser.id}/followers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setFollowers(data);
          })
          .catch(error => {
            console.log(error)
          });
  
        fetch(`${BASE_URL}/users/${currentUser.id}/following`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setFollowing(data);
          })
          .catch(error => {
            console.log(error)
          });
    }, [currentUser]);
  
    useEffect(() => {
      if (followers.length > 0 || following.length > 0) {
        console.log("Followers: ", followers.length);
        console.log("Following: ", following.length);
      }
    }, [followers, following]);

    // const [currentUser, setCurrentUser] = useState(null)
    const [login, setLogin] = useState(false)
    useEffect(() => {
        // setCurrentUser(getCurrentUserDetail())
        setLogin(isLoggedIn())
    }, [])
    console.log("CurrentUser : ", currentUser)
    return (
        <Card className='mt-2 border-0 rounded-0 shadow-sm prof-card'>
            <CardBody>
                <h3 className='text-uppercase'>user Information</h3>

                <Container className='text-center'>
                <img  src={BASE_URL + '/users/user/image/' + user.imageName} alt={user.name} style={{ maxWidth: '35%', maxHeight: '200px' }} className='img-fluid  rounded-circle' />
                </Container>
                <Table responsive striped hover bordered={true} className='mt-5'>
                    <tbody>
                        <tr>
                            <td >
                                ID
                            </td>
                            <td className="text-center">
                                {user.id}
                            </td>
                        </tr>
                        <tr>
                            <td >
                                NAME
                            </td>
                            <td className="text-center">
                                {user.name}
                            </td>
                        </tr>
                        <tr>
                            <td >
                                EMAIL
                            </td>
                            <td className="text-center">
                                {user.email}
                            </td>
                        </tr>
                        <tr>
                            <td >
                                ABOUT
                            </td>
                            <td className="text-center">
                                {user.about}
                            </td>

                        </tr>
                        <tr>
                            <td>
                                ROLE
                            </td>
                            <td className="text-center">
                                {user.roles.map((role) => {
                                    return (
                                        <div key={role.id}>{role.name}</div>
                                    )
                                })}
                            </td>
                        </tr>
                        <tr>
                        <td >
                            Followers
                        </td>
                        <td className="text-center">
                            {followers.length}
                        </td>
                        </tr>
                        <tr>
                        <td >
                            Following
                        </td>
                        <td className="text-center">
                            {following.length}
                        </td>
                        </tr>
                    </tbody>
                </Table>
                {currentUser ? (currentUser.id === user.id) ? (
                    <CardFooter className='text-center'>
                        <Button onClick={updateProfileClick} color='warning' >Update Profile</Button>
                    </CardFooter>
                ) : '' : ''}
            </CardBody>
        </Card>
    )
}

export default ViewUserProfile