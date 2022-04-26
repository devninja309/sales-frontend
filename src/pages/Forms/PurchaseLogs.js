import MetaTags from "react-meta-tags"
import axios from "axios"
import React, { useState, useEffect } from "react"

import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  // Label,
  // Button,
  // Form,
  Input,
  // InputGroup,
} from "reactstrap"

const PurchaseLogs = () => {
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

  useEffect(() => {
    getUsers()
  }, [msg])

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/logpurchase")
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

  //   const Delete = async (id) => {
  //     alert("Delete Successful!")
  //     try {
  //       const res = await axios.delete("http://localhost:5000/lPurchase", {
  //         data: { id },
  //       })
  //       setMsg(res.data.msg)
  //     } catch (error) {}
  //   }

  return (
    <React.Fragment>
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
                          <th>Quantity</th>
                          <th>AverageCost</th>
                          <th>Owner</th>
                          <th>Email</th>
                          <th>Contact Number</th>
                          <th>Deleted Time</th>
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
                                <td>{user.quantity}</td>
                                <td>{user.average_cost}</td>
                                <td>{user.owner}</td>
                                <td>{user.email}</td>
                                <td>{user.number}</td>
                                <td>{user.purdate}</td>
                              </tr>
                            ))
                          : users.map((user, index) => (
                              <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.quantity}</td>
                                <td>{user.average_cost}</td>
                                <td>{user.owner}</td>
                                <td>{user.email}</td>
                                <td>{user.number}</td>
                                <td>{user.purdate}</td>
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

export default PurchaseLogs
