import React, { useState } from 'react';
import { BASE_URL } from "../../services/helper";
import { updateUserImage } from '../../services/user-service';
import { getToken } from "../../auth";
import "./Profile.css";
import { Button, Card, CardBody, CardFooter, Container, Input, Table, FormFeedback } from 'reactstrap';
import { toast } from 'react-toastify';

const UpdateUserProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [about, setAbout] = useState(user.about);
  const [password, setPassword] = useState(user.password);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

const handleImageClick = () => {
    document.getElementById('profile-img').click();
};

const handleImageUpload = (e) => {
    setSelectedImage(e.target.files[0]);
    updateUserImage(selectedImage,user.id).then(data=>{
        toast.success("Image Uploaded !!")
    })
    .catch(error=>{
        toast.error("No image Selected, Default Image will be uploaded !!")
        console.log(error)
    })
};

  const handleUpdateProfile = () => {
    const updatedData = {
      name,
      email,
      password,
      about,
    };

    const token = getToken();
    console.log(token);

    const formData = new FormData();
    formData.append('image', selectedImage);

    Object.keys(updatedData).forEach((key) => {
      formData.append(key, updatedData[key]);
    });

    fetch(`${BASE_URL}/users/update/${user.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Profile updated successfully:', data);
        setError(data.password);
        if (data.password == null) {
          toast.success('Profile Updated Successfully !!');
        }
      })
      .catch((error) => {
        console.log('Error updating profile:', error);
      });
  };

  return (
    <div>
      <Card className="mt-2 border-0 rounded-0 shadow-sm prof-card">
        <CardBody>
          <h3>Welcome <span className='ms-3 me-2'> {user.name}</span>!</h3>

          <Container className="text-center">
            <label htmlFor="profile-image" className="profile-image-label">
              <img
                src={BASE_URL + '/users/user/image/' + user.imageName}
                alt={user.name}
                style={{ minWidth: '35%', minHeight: '200px', maxWidth: '100%', maxHeight: '350px', cursor: 'pointer' }}
                className="img-fluid rounded-circle"
                onClick={handleImageClick}
              />
              <input
                type="file"
                id="profile-img"
                className="profile-image-input"
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </label>
          </Container>
          <Table responsive striped hover bordered={true} className="mt-5">
            <tbody>
              <tr>
                <td>ID</td>
                <td className="text-center">{user.id}</td>
              </tr>
              <tr>
                <td >NAME</td>
                <td className="text-center">
                  <Input className='field' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>EMAIL</td>
                <td className="text-center">{email}</td>
              </tr>
              <tr>
                <td>Password</td>
                <td className="text-center">
                  <Input className='field' type="password" value={password} onChange={(e) => setPassword(e.target.value)} invalid={!!error} />
                  {error && <FormFeedback>{error}</FormFeedback>}
                </td>
              </tr>
              <tr>
                <td>Role</td>
                <td className="text-center">
                  {user.roles.map((role) => {
                    return <div key={role.id}>{role.name}</div>;
                  })}
                </td>
              </tr>
              <tr>
                <td>ABOUT</td>
                <td className="text-center">
                  <Input className='field' type="textarea" value={about} onChange={(e) => setAbout(e.target.value)} />
                </td>
              </tr>
            </tbody>
          </Table>
          </CardBody>
        <CardFooter className="text-center">
          <Button color="success" onClick={handleUpdateProfile}>
            Update Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateUserProfile;