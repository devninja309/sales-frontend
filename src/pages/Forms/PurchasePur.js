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

const PurchasePur = () => {
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

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/purchase")
    setUsers(response.data)
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
    console.log(id)
    try {
      const res = await axios.delete("http://localhost:5000/purchase", {
        data: { id },
      })
      setMsg(res.data.msg)
      getUsers()
    } catch (error) {}
  }

  return (
    <React.Fragment>
      {/* <ReactModal
        isOpen={modalShow}
        shouldCloseOnOverlayClick={true}
      >
        { detail ? (
          <>
            <p>{detail.quantity}</p>
            <p>{detail.via}</p>
            <p>{detail.cost}</p>
            <p>{detail.scost}</p>
            <p>{detail.expenses}</p>
            <p>{detail.description}</p>
            <p>{detail.owner}</p>
            <p>{detail.purdate}</p>
            <p>{detail.picdate}</p>
            <p>{detail.email}</p>
            <p>{detail.number}</p>
            <p>{detail.address}</p>
            <p>{detail.city}</p>
            <p>{detail.staten}</p>
            <p>{detail.zip}</p>
          </>
        ) : (
          <p>The data is empty</p>
        ) }
        <button onClick={() => setModalShow(false)}>Close</button>
      </ReactModal> */}
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
                          <th>AverageCost</th>
                          <th>Owner</th>
                          <th>Email</th>
                          <th>Contact Number</th>
                          <th>Purchase Date</th>
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
                                <td>{user.owner}</td>
                                <td>{user.email}</td>
                                <td>{user.number}</td>
                                <td>{user.purdate}</td>
                                <td>
                                  <div className="buttons">
                                    <Button
                                      className="button"
                                      style={{
                                        color: "black",
                                        background: "white",
                                      }}
                                    >
                                      <Link to="/purchases-form" className="">
                                        <i className="bx bxs-eyedropper p-0"></i>
                                      </Link>
                                    </Button>
                                    <Button
                                      className="button"
                                      style={{
                                        color: "black",
                                        background: "white",
                                      }}
                                      onClick={() => {
                                        setModalShow(true)
                                        setDetail(user)
                                      }}
                                      // onClick={function noRefCheck(){}}
                                    >
                                      <i
                                        className="bx bx-show-alt"
                                        style={{ color: "black" }}
                                      ></i>
                                    </Button>
                                    <Button
                                      className="button"
                                      style={{
                                        color: "black",
                                        background: "white",
                                      }}
                                      onClick={() => Delete(user.id)}
                                    >
                                      <i
                                        className="bx bx-trash-alt"
                                        style={{ color: "black" }}
                                      ></i>
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          : users.map((user, index) => (
                              <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.average_cost}</td>
                                <td>{user.owner}</td>
                                <td>{user.email}</td>
                                <td>{user.number}</td>
                                <td>{user.purdate}</td>
                                <td>
                                  <div className="buttons">
                                    <Button
                                      className="button"
                                      style={{
                                        color: "black",
                                        background: "white",
                                      }}
                                    >
                                      <Link to="/purchases-form" className="">
                                        <i className="bx bxs-eyedropper p-0"></i>
                                      </Link>
                                    </Button>
                                    <Button
                                      className="button"
                                      style={{
                                        color: "black",
                                        background: "white",
                                      }}
                                      onClick={() => {
                                        setModalShow(true)
                                        setDetail(user)
                                      }}
                                      // onClick={function noRefCheck(){}}
                                    >
                                      <i
                                        className="bx bx-show-alt"
                                        style={{ color: "black" }}
                                      ></i>
                                    </Button>
                                    <Button
                                      className="button"
                                      style={{
                                        color: "black",
                                        background: "white",
                                      }}
                                      onClick={() => Delete(user.id)}
                                    >
                                      <i
                                        className="bx bx-trash-alt"
                                        style={{ color: "black" }}
                                      ></i>
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

export default PurchasePur
