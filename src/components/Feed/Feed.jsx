import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { loadAllPosts } from '../../services/post-service'
import { Row, Col, Container, Pagination, PaginationItem, PaginationLink } from 'reactstrap'    //Pagination, PaginationItem, PaginationLink, Container
import Post from '../../pages/Posts/Post'
import { toast } from 'react-toastify'
// import InfiniteScroll from 'react-infinite-scroll-component'
import { deletePostService } from '../../services/post-service'
import './Feed.css'


function Feed() {

    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNumber: ''

    })

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        console.log("loading posts")
        console.log(currentPage)
        changePage(currentPage)

    }, [])

    const changePage = (pageNumber = 0, pageSize = 7) => {
        if (pageNumber > postContent.pageNumber && postContent.lastPage) {
            return
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
            return
        }
        loadAllPosts(pageNumber, pageSize).then(data => {
            setPostContent({
                content: data.content,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNumber: data.pageNumber
            })

            console.log(data);

        }).catch(error => {
            toast.error("Error in loading posts")

        })
    }



    function deletePost(post) {
        //going to delete post
        console.log(post)

        deletePostService(post.postId).then(res => {
            console.log(res)
            toast.success("Post is Deleted...")

            let newPostContents = postContent.content.filter(p => p.postId !== post.postId)
            setPostContent({ ...postContent, content: newPostContents })

        })
            .catch(error => {
                console.log(error)
                toast.error("Error in deleting post !!")
            })
    }

    console.log("LastPage ? : ",postContent.lastPage);

    // const changePageInfinite = () => {
    //     console.log("page changed")
    //     setCurrentPage(currentPage + 1)

    // }

    return (
        <div className="container-fluid">
            <Row>
                <Col md={
                    {
                        size: 12
                    }
                }>
                    {/* <h1 style={{color: "white"}}>Blogs Count  ( {postContent?.totalElements} )</h1> */}
                    {/* <InfiniteScroll
                        dataLength={postContent.content.length}
                        next={changePageInfinite}
                        hasMore={!postContent.lastPage}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'right' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    > */}
                        {
                            postContent.content.map((post, index) => (
                                <Post deletePost={deletePost} post={post} key={index} />
                            ))
                        }
                    
                    {/* </InfiniteScroll> */}
                    
                    <Container className='mt-4 d-flex justify-content-center'>
                        <Pagination className="slim-pagination" size='lg'>
                            <PaginationItem onClick={() => changePage(0)} disabled={postContent.pageNumber === 0}>
                                    <PaginationLink
                                    first
                                    />
                                </PaginationItem>
                                <PaginationItem onClick={() => changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber === 0}>
                                    <PaginationLink
                                    previous
                                    />
                                </PaginationItem> 
                                {
                                    [...Array(postContent.totalPages)].map((item, index) => (


                                        <PaginationItem onClick={() => changePage(index)} active={index === postContent.pageNumber} key={index}>
                                            <PaginationLink>

                                                {index + 1}

                                            </PaginationLink>
                                        </PaginationItem>

                                    ))
                                }

                            <PaginationItem onClick={() => changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                                <PaginationLink
                                next
                                />
                            </PaginationItem>
                            <PaginationItem onClick={() => changePage(postContent.totalPages-1)} disabled={postContent.pageNumber === 0}>
                                <PaginationLink
                                last
                                />
                            </PaginationItem>
                        </Pagination>
                    </Container>
                </Col>
            </Row>
             
        </div>
    )
}

export default Feed