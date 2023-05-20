import React, { useState, useEffect, useMemo } from 'react';
import { BASE_URL } from "../../services/helper"
import "./UserCard.css"
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';
import { FollowButton } from '../../components/Follow';
import { getCurrentUserDetail } from '../../auth'
import { Link } from 'react-router-dom';

function UserCard(props) {
  const { id, name, email, imageName } = props;

  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const currentUser = useMemo(() => getCurrentUserDetail(), []);

  // console.log(currentUser)

  useEffect(() => {
    const storedFollowStatus = localStorage.getItem(`followStatus_${currentUser.id}_${id}`);
    if (storedFollowStatus === 'following') {
      setIsFollowing(true);
      setFollowers(prevFollowers => [...prevFollowers, currentUser]); // Add current user to followers
    } else if (storedFollowStatus === 'not_following') {
      setIsFollowing(false);
    } else {
      fetch(`${BASE_URL}/users/${id}/followers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const isCurrentUserFollowing = data.some((follower) => follower.id === currentUser.id);
          setIsFollowing(isCurrentUserFollowing);
          setFollowers(data);
        })
        .catch(error => {
          console.log(error)
        });

      fetch(`${BASE_URL}/users/${id}/following`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const isCurrentUserFollowing = data.some((follower) => follower.id === currentUser.id);
          setIsFollowing(isCurrentUserFollowing);
          setFollowing(data);
        })
        .catch(error => {
          console.log(error)
        });
    }
  }, [id, currentUser]);

  useEffect(() => {
    if (followers.length > 0 || following.length > 0) {
      console.log("Followers: ", followers.length);
      console.log("Following: ", following.length);
    }
  }, [followers, following]);

  const handleFollow = () => {
    setIsFollowing(true);
    localStorage.setItem(`followStatus_${currentUser.id}_${id}`, 'following');
    fetch(`${BASE_URL}/users/${currentUser.id}/follow/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Operation Follow successful');
          setFollowers(prevFollowers => [...prevFollowers, currentUser]); // Add current user to followers
        } else {
          console.log('Operation Follow failed');
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  const handleUnfollow = () => {
    setIsFollowing(false);
    localStorage.setItem(`followStatus_${currentUser.id}_${id}`, 'not_following');
    fetch(`${BASE_URL}/users/${currentUser.id}/unfollow/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Operation unfollow successful');
          setFollowers(prevFollowers => prevFollowers.filter(follower => follower.id !== currentUser.id)); // Remove current user from followers
        } else {
          console.log('Operation unfollow failed');
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  return (
    <>
      <Card className='profile-card'>
        <div className='profile-image '>
          <CardImg className='profile-image mt-3' top width="100%" src={BASE_URL + '/users/user/image/' + imageName} alt={name} />
        </div>
        <CardBody className='text-center'>
          <CardTitle tag="h5">{name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{email}</CardSubtitle>
          <FollowButton
            isFollowing={isFollowing}
            onFollow={handleFollow}
            onUnfollow={handleUnfollow}
          />
          <Button outline color="warning" className='ms-3' style={{ marginLeft: "13rem" }} tag={Link} to="/chat">Message</Button>
          <CardSubtitle tag="h6" className="mt-2 mb-2 text-muted">
            Following: {following.length}
            <span className="ms-4">Followers: {followers.length}</span>
          </CardSubtitle>
        </CardBody>
      </Card>
    </>
  );
}

export default UserCard;
