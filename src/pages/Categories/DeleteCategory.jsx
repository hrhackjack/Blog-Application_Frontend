import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ListGroup, ListGroupItem } from 'reactstrap'
import "../../styles/DeleteCategory.css"

import { loadAllCategories, deleteSelectedCategories } from '../../services/category-service'


const CategoriesList = () => {
    const [categoriesList, setCategoriesList] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        loadAllCategories().then(data => {
            console.log("loading categories ")
            // console.log(data)
            setCategoriesList([...data])
        })
            .catch(error => {
                console.log(error);
                toast.error("Error in loading Categories!")
            })
    }, [])


const handleSelectCategory = (category) => {
    if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
        setSelectedCategories([...selectedCategories, category]);
    }
};

const handleDeleteCategories = (selectedCategories) => {
    deleteSelectedCategories(selectedCategories);
    // .then (data => {
    //     toast.success("Categories Deleted Successfully!")
    // }).catch(error => {
    //     console.log(error);
    //     toast.error("Error in deleting Categories!")
    // })
    console.log(selectedCategories);
    };

return (
    <div className="categories-list">
        <h2>Categories List</h2>
        <div>
        
          {/* <label htmlFor={category}>{category}</label> */}
            {categoriesList && categoriesList.map((cat, index) => {
                    return (
                        
                        <React.Fragment key={cat.id}>
                        <ListGroup>
                        <input
                            type="checkbox"
                            id={cat}
                            name={cat}
                            checked={selectedCategories.includes(cat)}
                            onChange={() => handleSelectCategory(cat)}
                        />
                        
                        <ListGroupItem  tag={Link} className='border-2 shadow-0 mt-1' key={index} action={true}>
                        
                            {cat.categoryTitle}
                        </ListGroupItem>
                        </ListGroup>
                        </React.Fragment>
                    )
                })
                }
                {/* {console.log(selectedCategories)} */}
        </div>
        <button onClick={handleDeleteCategories}>Delete Selected Categories</button>
    </div>
    );
};

export default CategoriesList;
