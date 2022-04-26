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
  Input,
} from "reactstrap"

const SalesLogs = () => {
  const [users, setUsers] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [filteredResults, setFilteredResults] = useState([])
  const [msg, setMsg] = useState("")

  useEffect(() => {
    getUsers()
  }, [msg])

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/logsale")
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
                  <CardTitle className="mb-4">Sale!</CardTitle>
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
                          <th>Eport</th>
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
                                <td>{user.eport}</td>
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
                                <td>{user.eport}</td>
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
  )
}

export default SalesLogs
