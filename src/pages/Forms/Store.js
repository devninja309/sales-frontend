import MetaTags from "react-meta-tags"
import axios from "axios"
import React, { useState, useEffect } from "react"

import { Link } from "react-router-dom"

import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  // Label,
  Button,
  // Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // InputGroup,
} from "reactstrap"
import { showRightSidebarAction } from "store/actions"

const Store = () => {
  // const [quantity, setQuantity] = useState("")
  // const [via, setVia] = useState("")
  // const [cost, setCost] = useState("")
  // const [scost, setScost] = useState("")
  // const [expenses, setExpenses] = useState("")
  // const [description, setDescription] = useState("")
  // const [owner, setOwner] = useState("")
  // const [purdate, setPurDate] = useState("")
  // const [picdate, setPicDate] = useState("")
  // const [email, setEmail] = useState("")
  // const [number, setNumber] = useState("")
  // const [address, setAddress] = useState("")
  // const [city, setCity] = useState("")
  // const [staten, setStaten] = useState("")
  // const [zip, setZip] = useState("")
  const [users, setUsers] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [filteredResults, setFilteredResults] = useState([])
  const [msg, setMsg] = useState("")
  const [modalShow, setModalShow] = useState(false)
  const [detail, setDetail] = useState()
  const [extra, setExtra] = useState([])

  useEffect(() => {
    // getUsers()
    console.log("here")
    axios.get("http://localhost:5000/purchase").then(res => {
      console.log(res.data)
      setUsers(res.data)
    })
  }, [])

  useEffect(() => {
    // getUsers()
    console.log(users)
  }, [users])

  const getUsers = async () => {
    // response.data.map((dt) => {
    //     dt.el.color
    // })
    // console.log(extraData)
    // setExtra(JSON.parse(extraData))
  }

  const searchItems = searchValue => {
    setSearchInput(searchValue)
    console.log(users)
    if (searchValue !== "") {
      console.log(searchValue)
      const filteredData = users.filter(item => {
        return (
          Object.values(item)
            // .join("")
            .toString()
            .replaceAll(",", " ")
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      })
      console.log("===============", searchValue)
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(users)
    }
  }

  const Delete = async id => {
    alert("Delete Successful!")
    try {
      const res = await axios.delete("http://localhost:5000/purchase", {
        data: { id },
      })
      setMsg(res.data.msg)
    } catch (error) {}
  }

  const setEportForSale = (eport, acost) => {
    localStorage.setItem("data", JSON.stringify({ eport: eport, acost: acost }))
  }



  return (
    <React.Fragment>
      <Modal isOpen={modalShow}>
        <ModalHeader></ModalHeader>
        <ModalBody>
          {detail ? (
            <>
              <h1>{detail.owner}</h1>
              <br />
              <p>
                <span>Quantity: </span>
                {detail.quantity}
              </p>
              <p>
                <span>Via: </span>
                {detail.via}
              </p>
              <p>
                <span>Cost: </span>
                {detail.cost}
              </p>
              <p>
                <span>Shipping Cost: </span>
                {detail.scost}
              </p>
              <p>
                <span>Expenses: </span>
                {detail.expenses}
              </p>
              <p>
                <span>Description: </span>
                {detail.description}
              </p>
              <p>
                <span>Purchase Date: </span>
                {detail.purdate}
              </p>
              <p>
                <span>Picup Date: </span>
                {detail.picdate}
              </p>
              <p>
                <span>Email: </span>
                {detail.email}
              </p>
              <p>
                <span>Contact Number: </span>
                {detail.number}
              </p>
              <p>
                <span>Address: </span>
                {detail.address}
              </p>
              <p>
                <span>City: </span>
                {detail.city}
              </p>
              <p>
                <span>State: </span>
                {detail.staten}
              </p>
              <p>
                <span>Zip: </span>
                {detail.zip}
              </p>
            </>
          ) : (
            <p>The data is empty</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={function noRefCheck() {}}>
            Do Something
          </Button>{" "}
          <Button onClick={() => setModalShow(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <div className="page-content">
        <MetaTags>
          <title>New Purchsae | Dropship Vending</title>
        </MetaTags>
        <Container fluid="true">
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Purchase!</CardTitle>
                  <form>
                    <Input
                      className="input is-rounded mb-4"
                      type="text"
                      onChange={e => searchItems(e.target.value)}
                      placeholder="Search..."
                    ></Input>
                    <table className="table is-striped is-fullwidth">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Average_Cost</th>
                          <th>Eport</th>
                          <th>Make</th>
                          <th>Model</th>
                          <th>Color</th>
                          <th>Tools</th>
                        </tr>
                      </thead>
                      <tbody>
                        {console.log(
                          "Rii---------",
                          filteredResults,
                          searchInput
                        )}
                        {searchInput.length > 0
                          ? filteredResults.map((user, index) => (
                              <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.average_cost}</td>
                                <td>{user.eport}</td>
                                <td>{user.make}</td>
                                <td>{user.model}</td>
                                <td>{user.color}</td>
                                <td>
                                  <div className="buttons">
                                    <Button color="danger" outline>
                                      <Link
                                        to="/sales-form"
                                        className=""
                                        onClick={() => setEportForSale(user.eport, user.average_cost)}
                                        
                                      >
                                      sale
                                      </Link>
                                    </Button>
                                    <Button
                                      color="success"
                                      outline
                                      onClick={() => {
                                        setModalShow(true)
                                        setDetail(user)
                                      }}
                                    >
                                      detail
                                    </Button>
                                    <Button
                                      color="info"
                                      outline
                                      onClick={() => {
                                        Delete(user.eport)
                                      }}
                                    >
                                      delete
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          : users.map((user, index) => (
                              <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.average_cost}</td>
                                <td>{user.eport}</td>
                                <td>{user.make}</td>
                                <td>{user.model}</td>
                                <td>{user.color}</td>
                                <td>
                                  <div className="buttons">
                                    <Button color="danger" outline>
                                      <Link
                                        to="/sales-form"
                                        className=""
                                        onClick={() => setEportForSale(user.eport, user.average_cost)}
                                        >
                                      sale
                                        </Link>
                                    </Button>
                                    <Button
                                      color="success"
                                      outline
                                      onClick={() => {
                                        setModalShow(true)
                                        setDetail(user)
                                      }}
                                    >
                                      detail
                                    </Button>
                                    <Button
                                      color="info"
                                      outline
                                      onClick={() => {
                                        Delete(user.eport)
                                      }}
                                    >
                                      delete
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
    // <div className="container mt-5">
    //   <h1>Welcome Back: Purchase</h1>
    //   <h2>{msg}</h2>

    // </div>
  )
}

export default Store
