import React from 'react';
import { useContext } from "react";
import { useState, useRef, useEffect } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../../auth";
import userContext from "../../context/userContext";
import logo from "../../resources/Blog_Application_Logo_2.0.png"
import './Navbar.css'
import SearchBar from './SearchBar/SearchBar';
import { search } from '../../services/post-service';
import { BASE_URL } from "../../services/helper"


const CustomNavbar = () => {
    const userContextData = useContext(userContext)
    let navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(undefined)
    const [searchResults, setSearchResults] = useState([]);

    const resultContainerRef = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
    
      const handleClickOutside = (event) => {
        if (resultContainerRef.current && !resultContainerRef.current.contains(event.target)) {
          setSearchResults([]);
        }
      };

    useEffect(() => {

        setLogin(isLoggedIn())
        setUser(getCurrentUserDetail())
     //   console.log(user);

    }, [login])

      const handleSearch = (query) => {
        fetch(`${BASE_URL}/posts/search/${query}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then(data => {
            setSearchResults(data)
        })
          .catch((error) => {
            console.log('Error:', error);
          });
      };

    //   console.log(searchResults);

    //   const handleSelectChange = (event) => {
    //     const postId = event.target.value;
    //     navigate(`/posts/${postId}`);
    //   };

    const logout = () => {
        doLogout(() => {
            //logged out
            setLogin(false)
            userContextData.setUser({
                data: null,
                login: false
            })

            navigate("/")
        })
    }

    return (
        <div>
            <Navbar
                expand="md"
                fixed=""
                className="px-5"
            >
            <NavbarBrand tag={ReactLink} to="/"> <img  src={logo} alt="logo" style={{ height: 52.5,  width: 52.5 }} /> <span className='ms-2 me-3'>OpenBlog</span> </NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >

                        <NavItem>
                            <NavLink tag={ReactLink} to="/" >
                                Feeds
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/about" >
                                About
                            </NavLink>
                        </NavItem>

                        <UncontrolledDropdown
                            inNavbar
                            nav
                        >
                            <DropdownToggle
                                caret
                                nav
                            >
                                More
                            </DropdownToggle>
                            <DropdownMenu end className='text-center mt-1'>
                                {
                                    login && user.roles[0].id === 7 && (
                                                <DropdownItem tag={ReactLink} to={`/adminPanel`} >
                                                    Manage_App  
                                                </DropdownItem>
                                    )
                                }
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <div className="search-bar">
                                <SearchBar handleSearch={handleSearch} />
                        </div>
                    </Nav>
                    
                    <Nav navbar>
                    
                        {
                            login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/user/dashboard" >
                                        <span class="create">
                                        <i class="far fa-pen-to-square fa-lg me-3"></i>
                                        </span>
                                            
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/chat" >
                                        <span class="icon-hover">
                                            <i class="fas fa-comments fa-lg me-3"></i>
                                        </span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/explore" >
                                            Explore
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`} >
                                            {user.name}
                                        </NavLink>
                                    </NavItem>
                                    <NavItem >
                                        <NavLink  onClick={logout} >
                                            Logout
                                        </NavLink>
                                    </NavItem>
                                </>
                            )
                        }

                        {
                            !login && (
                                    <NavItem >
                                        <NavLink tag={ReactLink} to="/login" >
                                            LogIn / SignUp
                                        </NavLink>
                                    </NavItem>
                            )
                        }
                    </Nav>
                </Collapse>
            </Navbar>

            <div className='results-container  justify-content-center' ref={resultContainerRef}>
            {Array.isArray(searchResults) && searchResults.length > 0 && (
                searchResults.map(result => (
                    <div className="search-result" key={result.postId} onClick={() => navigate(`/posts/${result.postId}`)}>
                    {result.title}
                    </div>
                ))
            )}
            </div>

            { //Dropdown
                /* {Array.isArray(searchResults) && searchResults.length > 0 && (
            <select className="search-results-dropdown" onChange={handleSelectChange}>
            <option value="" disabled selected> Select a post </option>
                {searchResults.map(result => (
                <option key={result.postId} value={result.postId}>
                    <div className="search-result">
                    {result.title}
                    </div>
                </option>
                ))}
            </select>
            )} */}
        </div>
        
    )
}

export default CustomNavbar;