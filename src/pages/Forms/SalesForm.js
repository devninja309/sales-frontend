import MetaTags from "react-meta-tags"
import React, { useState } from "react"
import axios from "axios"

import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  Label,
  Button,
  Form,
  Input,
  InputGroup,
} from "reactstrap"
import userProfile from "pages/Authentication/user-profile"

const SalesForm = () => {
  const [eport, setEport] = useState("")
  const [via, setVia] = useState("")
  const [cost, setCost] = useState(0)
  const [scost, setScost] = useState(0)
  const [expenses, setExpenses] = useState(0)
  const [description, setDescription] = useState("")
  const [owner, setOwner] = useState("")
  const [purdate, setPurDate] = useState("")
  const [picdate, setPicDate] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [staten, setStaten] = useState("")
  const [zip, setZip] = useState("")
  const [msg, setMsg] = useState("")
  const[acost, setACost]=useState(0)

  React.useEffect(() => {
  if(localStorage.getItem("data")) {
    const data = JSON.parse(localStorage.getItem("data"))
    setEport(data.eport)
    setACost(data.acost)
  }
  }, [])

  React.useEffect(() => {
    localStorage.removeItem("eport")
  }, [eport])

  const Sales = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/sale", {
        eport: eport,
        via: via,
        cost: cost,
        scost: scost,
        expenses: expenses,
        description: description,
        owner: owner,
        purdate: purdate,
        picdate: picdate,
        email: email,
        number: number,
        address: address,
        city: city,
        staten: staten,
        zip: zip,
        average_cost: (Number(cost) + Number(scost) + Number(expenses)) / 4,
        purchased_cost:acost
      })
      console.log("sdfsdfsdf")
      alert(res.data.msg)
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>New Purchsae | Dropship Vending</title>
        </MetaTags>
        <Container fluid={true}>
          {/* <Breadcrumbs title="Forms" breadcrumbItem="Form Layouts" /> */}
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">New Sales </CardTitle>
                  <p className="has-text-centered">{msg}</p>

                  <Form onSubmit={Sales} className="box">
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-InputQuantity">
                            Eport
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="please write eport"
                            value={eport}
                            onChange={e => setEport(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label>Via</Label>
                          <select
                            id="formrow-sales-InputState"
                            className="form-control"
                            onChange={e => setVia(e.target.value)}
                          >
                            <option defaultValue>Choose...</option>
                            <option>Ebay</option>
                            <option>Website</option>
                            <option>Instagram</option>
                            <option>Marketing</option>
                          </select>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label >Cost</Label>
                          <Input
                            type="Cost Without Shipping"
                            className="form-control"
                            id="Cost-sales-Input"
                            placeholder="Cost Without Shipping"
                            onChange={e => setCost(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label>Shipping Cost</Label>
                          <Input
                            type="Shipping Cost"
                            className="form-control"
                            id="Shipping-sales-Input"
                            placeholder="Shipping Cost"
                            onChange={e => setScost(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Row>
                          <Col md={12}>
                            <div className="mb-3">
                              <Label>
                                Other Expenses
                              </Label>
                              <Input
                                type="Expense"
                                className="form-control"
                                id="Expenses-sales-Input"
                                placeholder="Enter the total amount of other expenses"
                                onChange={e => setExpenses(e.target.value)}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={12}>
                            <div className="mb-3">
                              <Label>
                                Buy owner
                              </Label>
                              <Input
                                type="Previous Owner"
                                className="form-control"
                                id="Owner-sales-Input"
                                placeholder="Enter the buy Owner Name"
                                onChange={e => setOwner(e.target.value)}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={12}>
                            <div className="mb-3">
                              <Label>
                                Purchase Date
                              </Label>
                              <Input
                                type="Date"
                                className="form-control"
                                id="Date-sales-Input"
                                placeholder="Enter purchase date"
                                onChange={e => setPurDate(e.target.value)}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>

                      <Col md={6}>
                        <Row>
                          <div className="mb-5">
                            <Label>Other Expenses Description</Label>
                            {/* <p className="text-muted m-b-15">
                            Bootstrap maxlength supports textarea as well as inputs.
                            Even on old IE.
                          </p> */}
                            <Input
                              type="Description"
                              className="form-control"
                              id="Description-sales-Input"
                              placeholder="Enter purchase date"
                              onChange={e => setDescription(e.target.value)}
                            />
                          </div>
                        </Row>

                        <Row>
                          <Col md={12}>
                            <div className="mb-3 mt-2">
                              <Label>Pickup Date</Label>
                              <Input
                                type="Date"
                                className="form-control"
                                id="PicDate-sales-Input"
                                placeholder="Enter Pickup date"
                                onChange={e => setPicDate(e.target.value)}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label>Email</Label>
                          <Input
                            type="email"
                            className="form-control"
                            id="formrow-sales-email-Input"
                            placeholder="Enter previuos owner Email ID"
                            onChange={e => setEmail(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label>Contact Number</Label>
                          <Input
                            type="Password"
                            className="form-control"
                            id="Number-sales-Input"
                            placeholder="Enter previuos owner contac number"
                            onChange={e => setNumber(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label>Address</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="Address-sales-Input"
                            placeholder="Enter your address"
                            onChange={e => setAddress(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label>City</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-sales-InputCity"
                            placeholder="Enter City"
                            onChange={e => setCity(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label>State</Label>
                          <select
                            id="formrow-sales-InputStaten"
                            className="form-control"
                            onChange={e => setStaten(e.target.value)}
                          >
                            <option defaultValue>Choose...</option>
                            <option>Domanican</option>
                          </select>
                        </div>
                      </Col>

                      <Col lg={3}>
                        <div className="mb-3">
                          <Label>Zip</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-sales-InputZip"
                            placeholder="Enter Your Zip Code"
                            onChange={e => setZip(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>

                    <div className="mb-3">
                      <div className="form-check">
                        <Input
                          type="checkbox"
                          className="form-check-Input"
                          id="formrow-sales-customCheck"
                        />
                        <Label
                          className="form-check-Label"
                          htmlFor="formrow-customCheck"
                        >
                          Check me out
                        </Label>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-primary w-md">Submit</button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        {/* container-fluid */}
      </div>
    </React.Fragment>
  )
}
export default SalesForm;
