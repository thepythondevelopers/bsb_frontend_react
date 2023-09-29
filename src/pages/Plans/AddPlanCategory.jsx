import react, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPlanCategory } from "../../Redux/Action/Action";
import { SketchPicker, TwitterPicker } from 'react-color';
import '../DocumentManagentment/style.css';
const API = process.env.REACT_APP_API_BASE_URL;

const AddPlanCategory = (props) => {
    const category = useSelector((state) => state.planCategoryReducer.planCategory);
    const dispatch = useDispatch();
    const getToken = JSON.parse(localStorage.getItem("user-info"));
    const token = getToken?.token;
    const dropDownCont = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [addCategory, setAddCategory] = useState(false);
    const [editCategoryBox, setEditCategoryBox] = useState(false);
    const [getCategoryList, setGetCategoryList] = useState(false);
    const [coloPrickerBox, setColoPrickerBox] = useState(false);
    const [pickerId, setPickerId] = useState("");
    const [categoryForm, setCategoryform] = useState({
        title: "",
        color: "#fff"
    });
    const [singleCategory, setSingleCategory] = useState({});
    const [editCategory, setEditSingleCategory] = useState({
        title: "",
        color: ""
    });
    const handleClickOutside = event => {
        if (dropDownCont.current && !dropDownCont.current.contains(event.target)) {
            setColoPrickerBox(false);
        }
    };
    const handleChangeComplete = (e) => {
        setCategoryform({ ...categoryForm, "color": e.hex });
    }
    const handleCategoryChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setCategoryform({ ...categoryForm, [name]: value });
    }
    const handleUpdateChangeComplete = (e) => {
        setCategoryform({ ...editCategory, "color": e.hex });
    }
    const handleUpdateCategoryChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditSingleCategory({ ...editCategory, [name]: value });
    }
    const handleSubmitCategory = (e) => {
        e.preventDefault();
        setAddCategory(false);
        createSlidebar(categoryForm)
        setCategoryform('')
    }
    const handleUpateSubmitCategory = (e, id) => {
        e.preventDefault();
        setEditCategoryBox(false);
        singleUpdateCategoryAPI(id, editCategory)
    }
    useEffect(() => {
        categoryListAPI();
        singleCategoryAPI();
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    // get Plan Category
    const categoryListAPI = (data) => {
        return fetch(`${API}/get-plan-category`, {
            method: "POST",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => (res.json()))
            .then((json) => {
                dispatch(getPlanCategory(json));
            })
    }
    // create Plan Category 
    const createSlidebar = (data) => {
        return fetch(`${API}/create-plan-category`, {
            method: "POST",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((json) => {
                categoryListAPI();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Delete Plan Category 
    async function deleteCategory(id) {
        let result = await fetch(`${API}/delete-plan-category/${id}`, {
            method: "DELETE",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        categoryListAPI();
    }

    // get Plan Single Category
    const singleCategoryAPI = (id, data) => {
        return fetch(`${API}/get-plan-category/${id}`, {
            method: "POST",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => (res.json()))
            .then((json) => {
                categoryListAPI();
                setSingleCategory(json)
                setEditSingleCategory(json[0])
            })
    }
    // Update Plan Single Category
    const singleUpdateCategoryAPI = (id, data) => {
        return fetch(`${API}/update-plan-category/${id}`, {
            method: "PUT",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => (res.json()))
            .then((json) => {
                categoryListAPI();
                setSingleCategory()
            })
    }

    return (
        <div className='doc-management-wrap-cate'>
            <div className='doc-management-wrap-head'>
                {!addCategory ? (
                    <>
                        {
                            !editCategoryBox ? (<h2 className="dasshboard_heading">Plan Categories</h2>) :
                                (<h2 className="dasshboard_heading">Edit Plan Category</h2>)
                        }
                    </>
                ) : (<h2 className="dasshboard_heading">Add Plan Categories</h2>)}
                <div className='btn-group'>
                    {!addCategory ? (
                        <>
                            {
                                !editCategoryBox ? (
                                    <button className='btn cmn_yellow_bg'
                                        onClick={(e) => (setAddCategory(true))}
                                    >
                                        <svg className="icon" aria-labelledby="Add Item">
                                            <title id="addItem">Add Item</title>
                                            <use
                                                xlinkHref="/assets/svg-icons/icons.svg#addItem"
                                                xlinkTitle="Add Item"
                                            ></use>
                                        </svg>
                                        Add Plan Category
                                    </button>
                                ) : (
                                    <button className='btn cmn_yellow_bg'
                                        onClick={(e) => (handleUpateSubmitCategory(e, editCategory?._id))}
                                    >
                                        <svg className="icon" aria-labelledby="Add Item">
                                            <title id="addItem">Add Item</title>
                                            <use
                                                xlinkHref="/assets/svg-icons/icons.svg#addItem"
                                                xlinkTitle="Add Item"
                                            ></use>
                                        </svg>
                                        Save Plan Category
                                    </button>
                                )
                            }
                        </>
                    ) : <button className='btn cmn_yellow_bg'
                        onClick={(e) => (handleSubmitCategory(e))}
                    >
                        <svg className="icon" aria-labelledby="Add Item">
                            <title id="addItem">Add Item</title>
                            <use
                                xlinkHref="/assets/svg-icons/icons.svg#addItem"
                                xlinkTitle="Add Item"
                            ></use>
                        </svg>
                        Save Plan Category
                    </button>
                    }
                </div>
            </div>
            {!addCategory ? (
                <>
                    {
                        !editCategoryBox && (
                            <ul className='management-cate-list'>
                                {
                                    category.length > 0 && category.map((curelem, index) => {
                                        return (
                                            <li key={index}>
                                                <span className='list-item'>{curelem.title}</span>
                                                <div className='btn-group'>
                                                    <div className='coloPricker' onClick={(e) => { setPickerId(curelem._id); setColoPrickerBox(true) }} style={{ background: curelem.color }}></div>
                                                    {
                                                        (coloPrickerBox && curelem._id == pickerId) && (
                                                            <div className='twitterPicker-box' ref={dropDownCont}>
                                                                <TwitterPicker color={curelem.color} onChange={(e) => {
                                                                    // setEditSingleCategory({ ...editCategory, "color": e.hex, "title": curelem.title });
                                                                    singleUpdateCategoryAPI(curelem._id, { "color": e.hex, "title": curelem.title })
                                                                }} />
                                                            </div>
                                                        )
                                                    }
                                                    <button className='btn cmn_yellow_bg' onClick={(e) => { setAddCategory(false); singleCategoryAPI(curelem._id); setEditCategoryBox(true) }}> <svg className="icon" aria-labelledby="Edit Item">
                                                        <title id="editItem">Edit Item</title>
                                                        <use
                                                            xlinkHref="/assets/svg-icons/icons.svg#editItem"
                                                            xlinkTitle="Edit Item"
                                                        ></use>
                                                    </svg> Edit</button>
                                                    <button className='btn cmn_red_bg' onClick={(e) => { deleteCategory(curelem._id) }}> <svg className="icon" aria-labelledby="View Item">
                                                        <title id="viewIem">View Item</title>
                                                        <use
                                                            xlinkHref="/assets/svg-icons/icons.svg#viewItem"
                                                            xlinkTitle="View Item"
                                                        ></use>
                                                    </svg> Delete</button>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )
                    }
                </>
            ) : (
                <div className='categoryForm'>
                    <div className='form-group'>
                        <label htmlFor="title">Plan Name</label>
                        <input type="text" name='title' id='title' className='form-control' placeholder='Category name' onChange={(e) => handleCategoryChange(e)} value={categoryForm.category_name} />
                    </div>
                    <SketchPicker
                        color={categoryForm.color}
                        onChangeComplete={handleChangeComplete}
                    />
                </div>
            )
            }
            {
                editCategoryBox && (
                    <>
                        <div className='categoryForm'>
                            <div className='form-group'>
                                <label htmlFor="title">Plan Name</label>
                                <input type="text" name='title' id='title' className='form-control' placeholder='Category name' onChange={(e) => handleUpdateCategoryChange(e)} value={editCategory?.title} />
                            </div>
                            <SketchPicker
                                color={editCategory.color}
                                onChangeComplete={handleUpdateChangeComplete}
                            />
                        </div>
                    </>

                )
            }
        </div >
    )
};

export default AddPlanCategory;