import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { loadAllCategories } from '../../services/category-service';
import './csm.css';

function CategorySideMenu() {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        console.log('loading categories');
        console.log(data);
        setCategories([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error in loading Categories!');
      });
  }, []);

  const listGroupItems = categories.slice(0, 7).map((cat, index) => (
    <ListGroupItem
      tag={Link}
      to={`/categories/${cat.categoryId}`}
      className="border-2 shadow-0 mt-1"
      key={index}
      action={true}
    >
      {cat.categoryTitle}
    </ListGroupItem>
  ));

  const dropdownItems = categories.slice(7).map((cat, index) => (
    <ListGroupItem
      tag={Link}
      to={`/categories/${cat.categoryId}`}
      className="border-2 shadow-0 mt-1"
      key={index}
      action={true}
    >
      {cat.categoryTitle}
    </ListGroupItem>
  ));

  const toggleMoreCategories = () => {
    setIsCollapsed(!isCollapsed);
  };
  // console.log(listGroupItems ,showMoreCategories, dropdownItems);

  return (
    <div className="list-group-container">
      <ListGroup>
        <ListGroupItem
          tag={Link}
          to="/"
          onClick={() => setActive(false)}
          className={active ? 'active' : ''}
          action={true}
        >
          All Blogs
        </ListGroupItem>
        {listGroupItems}
      </ListGroup>
      {categories.length > 7 ? (
          isCollapsed ? (
          <Button className='more-cat list-group-item list-group-item-action'
              onClick={toggleMoreCategories}
            >
              More Categories
            </Button>
          ) : (
            <>{dropdownItems}</>
          )
        ) : null
      }
    </div>
  );
}

export default CategorySideMenu;
