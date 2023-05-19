import React from 'react';
import { Button } from 'reactstrap';


// FollowButton.js
export const FollowButton = ({ isFollowing, onFollow, onUnfollow }) => {
    return (
      <Button color="info"
      outline onClick={isFollowing ? onUnfollow : onFollow}>
        {isFollowing ? ' Unfollow ' : ' Follow '}
      </Button>
    );
  };
  
  // // FollowersList.js
  // export const FollowersList = ({ followers }) => {
  //   return (
  //     <ul>
  //       {followers.map(follower => (
  //         <li key={follower._id}>
  //           {follower.name}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };
  