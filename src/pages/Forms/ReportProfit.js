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
  Input,
} from "reactstrap"

const ReportProfit = () => {
  const [users, setUsers] = useState([])
  const [sales, setSales] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [filteredResults, setFilteredResults] = useState([])
  const [msg, setMsg] = useState("")

  useEffect(() => {
    getUsers()
  }, [msg])

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/sale")
    setUsers(response.data)
  }

  const searchItems = searchValue => {
    setSearchInput(searchValue)
    console.log(users)
    if (searchValue !== "") {
      console.log(searchValue)
      const filteredData = users.filter(item => {
        return Object.values(item)
          .toString()
          .replaceAll(",", " ")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      })
      console.log("===============", searchValue)
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(users)
    }
  }

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
                          <th>Via</th>
                          <th>Profit</th>
                          <th>Description</th>
                          <th>Owner</th>
                          <th>Email</th>
                          <th>Number</th>
                          <th>Address</th>
                          <th>City</th>
                          <th>State</th>
                          <th>Zip</th>
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
                                <td>{user.via}</td>
                                <td>
                                  {Number(user.average_cost)- Number(user.purchased_cost)}
                                </td>
                                <td>{user.description}</td>
                                <td>{user.owner}</td>
                                <td>{user.email}</td>
                                <td>{user.number}</td>
                                <td>{user.address}</td>
                                <td>{user.city}</td>
                                <td>{user.staten}</td>
                                <td>{user.zip}</td>
                              </tr>
                            ))
                          : users.map((user, index) => (
                              <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.quantity}</td>
                                <td>{user.via}</td>
                                <td>
                                  {Number(user.average_cost)- Number(user.purchased_cost)}
                                </td>
                                <td>{user.description}</td>
                                <td>{user.owner}</td>
                                <td>{user.email}</td>
                                <td>{user.number}</td>
                                <td>{user.address}</td>
                                <td>{user.city}</td>
                                <td>{user.staten}</td>
                                <td>{user.zip}</td>
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

export default ReportProfit
