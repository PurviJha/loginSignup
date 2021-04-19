import React, { useState, useEffect } from 'react'
import { Table, Card, CardTitle, CardBody } from 'reactstrap';
import axios from "axios"
import { Pagination, PaginationItem, PaginationLink, FormGroup, Label, Input, Button } from 'reactstrap';
import { useHistory } from "react-router-dom"

export default function List() {
    const history = useHistory()

    //state
    const [userList, setUserList] = useState([])
    const [shownList, setShownList] = useState({})
    const [search, setSearch] = useState("")
    const [selectedPage, setSelectedPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([])
    const listSize = [5, 10, 15, 20, 25, 30]

    //function
    useEffect(() => {
        axios.get('http://www.json-generator.com/api/json/get/cfoQAuorIi?indent=2').then((response) => {
            setUserList(response.data)
            const length = response.data.length
            const result = Math.ceil(length / 5)
            let page = []
            let listToBeShown = {}

            let from = 0
            let to
            for (let i = 1; i <= result; i++) {
                to = i * 5
                page.push(i)
                listToBeShown[i] = response.data.slice(from, to)

                from = to

            }
            setShownList(listToBeShown)
            setPages(page)



        }).catch(err => {
            console.log(err)
        })



    }, [])

    useEffect(() => {
        let filteredUsers = userList.filter(obj =>
            obj.name.toLowerCase().startsWith(search.toLowerCase())


        );
        const result = Math.ceil(filteredUsers.length / selectedPage)
        let page = []
        let listToBeShown = {}
        let from = 0
        let to
        for (let i = 1; i <= result; i++) {
            to = i * selectedPage
            page.push(i)
            listToBeShown[i] = filteredUsers.slice(from, to)
            from = to
        }
        setPages(page)
        setCurrentPage(1)
        setShownList(listToBeShown)

    }, [search, selectedPage, userList])


    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handlePageChange = (e) => {
        setSelectedPage(e.target.value)
    }
    const changeCurrentPage = (page) => {
        setCurrentPage(page)
    }

    const logout = () => {
        history.push("/")
    }

    return (
        <div >
            <Card >
                <CardTitle tag="h5" className="cardTitle">Users</CardTitle>
                <CardBody>
                    <div className="d-flex flex-row-reverse"><Button color="primary" onClick={logout}>Logout</Button></div>
                    <div className="d-flex justify-content-center">
                        <FormGroup className="search">
                            <Label for="search" >Search</Label>
                            <Input type="text" name="search" value={search} onChange={handleSearch} placeholder="Search User" />
                        </FormGroup>
                    </div>

                    <Table hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th> Image</th>
                                <th> Name</th>
                                <th> Email</th>
                                <th> Gender</th>
                                <th> Age</th>
                                <th> Phone</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                Object.keys(shownList).length !== 0 && shownList[currentPage].map(({ index, picture, name, gender, age, phone, email }) =>
                                    <tr key={index + 1}>
                                        <th>{index + 1}</th>
                                        <td><img src={picture} alt="" /></td>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{gender}</td>
                                        <td>{age}</td>
                                        <td>{phone}</td>
                                    </tr>
                                )
                            }


                        </tbody>


                    </Table>
                    <div className="d-flex justify-content-between">
                        <Pagination aria-label="Page navigation example">

                            <PaginationItem disabled={currentPage === 1}>
                                <PaginationLink previous onClick={() => changeCurrentPage(currentPage - 1)} />
                            </PaginationItem>
                            {
                                pages.map((obj) =>
                                    <PaginationItem active={obj === currentPage} key={obj}>
                                        <PaginationLink onClick={() => changeCurrentPage(obj)}>
                                            {obj}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            }
                            <PaginationItem disabled={currentPage === pages[pages.length - 1]}>
                                <PaginationLink next onClick={() => changeCurrentPage(currentPage + 1)} />
                            </PaginationItem>

                        </Pagination>

                        <Input style={{ width: "7%" }} type="select" value={selectedPage} onChange={handlePageChange} name="pageChange" >
                            {
                                listSize.map((option, i) =>
                                    <option key={i}>{option}</option>
                                )
                            }

                        </Input>
                    </div>

                </CardBody>


            </Card>



        </div>
    )
}
