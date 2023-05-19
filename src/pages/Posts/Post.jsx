import React, { useEffect, useContext, useState } from 'react';
import './Post.css';
import { BASE_URL } from '../../services/helper';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardText } from 'reactstrap';
import { getCurrentUserDetail, isLoggedIn } from '../../auth';
import userContext from '../../context/userContext';

function Post({ post = { id: -1, title: 'This is default post title', content: 'This is default post content' }, deletePost }) {
  const userContextData = useContext(userContext);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    setUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);

  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);
  const [likeStatus, setLikeStatus] = useState(false);
  const [dislikeStatus, setDislikeStatus] = useState(false);

useEffect(() => {
    const storedLikeStatus = localStorage.getItem(`likeStatus_${post.postId}`);
    const storedDislikeStatus = localStorage.getItem(`dislikeStatus_${post.postId}`);
    if (storedLikeStatus) {
        setLikeStatus(true);
    }
    if (storedDislikeStatus) {
        setDislikeStatus(true);
    }
}, []);

const parser = new DOMParser();
const htmlString = post.content.substring(0, 101);
const doc = parser.parseFromString(htmlString, 'text/html');
const content = doc.body.textContent;

const doLike = () => {
    setLikeStatus(true);
    setLikes(likes + 1);
    localStorage.setItem(`likeStatus_${post.postId}`, 'liked');
    fetch(`${BASE_URL}/posts/${post.postId}/like`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (response.ok) {
            console.log('Yay! You Liked This');
        } else {
            console.log('Can not Like this Post...');
        }
    })
    .catch((error) => {
        console.log('Error:', error);
    });
};

const doDislike = () => {
    setDislikeStatus(true);
    setDislikes(dislikes + 1);
    localStorage.setItem(`dislikeStatus_${post.postId}`, 'disliked');
    fetch(`${BASE_URL}/posts/${post.postId}/dislike`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (response.ok) {
            console.log('Uh! You disLiked This');
        } else {
            console.log('You can not dislike this Post...');
        }
    })
    .catch((error) => {
        console.log('Error:', error);
    });
};

const doUnlike = async () => {
    try {
      await fetch(`${BASE_URL}/posts/${post.postId}/unLike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('You unLiked This');
      setLikes((prevLikes) => prevLikes - 1); // Update the likes state
      localStorage.removeItem(`likeStatus_${post.postId}`);
      setLikeStatus(false);
    } catch (error) {
      console.log('Error:', error);
    }
  };
  
  const doUndislike = async () => {
    try {
      await fetch(`${BASE_URL}/posts/${post.postId}/unDislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('You unDisliked This');
      setDislikes((prevDislikes) => prevDislikes - 1); // Update the dislikes state
      localStorage.removeItem(`dislikeStatus_${post.postId}`);
      setDislikeStatus(false);
    } catch (error) {
      console.log('Error:', error);
    }
  };

const handleLike = async (event) => {
    event.preventDefault();
    try {
      if (likeStatus) {
        await doUnlike();
      } else {
        if (dislikeStatus) {
          await doUndislike();
          await doLike();
        } else {
          await doLike();
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  
  const handleDislike = async (event) => {
    event.preventDefault();
    try {
      if (dislikeStatus) {
        await doUndislike();
      } else {
        if (likeStatus) {
          await doUnlike();
          await doDislike();
        } else {
          await doDislike();
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  

  return (
    <Card className='border-0 card-post shadow-sm mt-3' tag={Link} to={'/posts/' + post.postId}>
      <CardBody className='card-body-post'>
        <h3 className='title'>{post.title}</h3>
        <CardText className='content ms-3 mt-3'>
          {content + '.....'}
          <Link tag={Link} className='the_link ms-2' to={'/posts/' + post.postId}>
            Read More
          </Link>
        </CardText>
        <img className='pic' src={BASE_URL + '/post/image/' + post.imageName} alt='' />
        <h6 className='like-btn ms-4'>
          <i className={`far fa-thumbs-up custom-icon me-4 ${likeStatus ? 'fas fa-thumbs-up custom-icon me-4' : ''}`} onClick={handleLike}>
            <span className='like'>{likes}</span>
          </i>{' '}
          <i className={`far fa-thumbs-down custom-icon ms-3 ${dislikeStatus ? 'fas fa-thumbs-down custom-icon ms-3' : ''}`} onClick={handleDislike}>
            <span className='dislike'>{dislikes}</span>
          </i>
        </h6>
        <div>
          {userContextData.user.login && (user && user.id === post.user.id ? <Button outline tag={Link} to={`/user/update-blog/${post.postId}`} color='success' className='ms-2'>Edit</Button> : '')}
          {userContextData.user.login && (user && user.id === post.user.id ? <Button outline onClick={(event) => deletePost(post)} color='dark' className='ms-2'>Delete</Button> : '')}
        </div>
      </CardBody>
    </Card>
  );
}

export default Post;
