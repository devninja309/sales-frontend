import MetaTags from "react-meta-tags"
import React, { useEffect, useState } from "react"
import axios from "axios"
import PropTypes from 'prop-types'

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

const PurchaseForm = () => {
  const [quantity, setQuantity] = useState(0)
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
  const [extra, setExtra] = useState([])

  const Purchase = async e => {
    e.preventDefault()
    const other = {
      quantity: quantity,
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
      average_cost: (Number(cost) + Number(scost) + Number(expenses)) / 4
     }

    const data = extra.map((el) => {
         return { color: el.color, model: el.model, make: el.make, eport: el.eport, ...other }
      })

    console.log(data)

    try {
      const res = await axios.post("http://localhost:5000/purchase", { data: data })
      alert(res.data.msg)
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  useEffect(() => {
    Array.from({ length: quantity }).map((el, idx) => {
      const data = {
        id: idx,
        eport: "",
        make: "",
        model: "",
        color: ""
      }
      setExtra(prevState => {
        return [...prevState, data]
      })
    })
  }, [quantity])

  useEffect(() => {
    console.log(extra)
  }, [extra])

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
                  <CardTitle className="mb-4">New Purchase </CardTitle>
                  <p className="has-text-centered">{msg}</p>

                  <Form onSubmit={Purchase} className="box">
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-InputQuantity">
                            Quantity
                          </Label>
                          <select
                            id="Quantity-Input"
                            className="form-control"
                            onChange={e => setQuantity(e.target.value)}
                          >
                            <option defaultValue>Choose...</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-InputState">Via</Label>
                          <select
                            id="formrow-InputState"
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
                          <Label htmlFor="formrow-Input">Cost</Label>
                          <Input
                            type="Cost Without Shipping"
                            className="form-control"
                            id="Cost-Input"
                            placeholder="Cost Without Shipping"
                            onChange={e => setCost(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-Input">Shipping Cost</Label>
                          <Input
                            type="Shipping Cost"
                            className="form-control"
                            id="Shipping-Input"
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
                              <Label htmlFor="formrow-Input">
                                Other Expenses
                              </Label>
                              <Input
                                type="Expense"
                                className="form-control"
                                id="Expenses-Input"
                                placeholder="Enter the total amount of other expenses"
                                onChange={e => setExpenses(e.target.value)}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={12}>
                            <div className="mb-3">
                              <Label htmlFor="formrow-Input">
                                Previous Owner
                              </Label>
                              <Input
                                type="Previous Owner"
                                className="form-control"
                                id="Owner-Input"
                                placeholder="Enter the Previews Owner Name"
                                onChange={e => setOwner(e.target.value)}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={12}>
                            <div className="mb-3">
                              <Label htmlFor="formrow-Input">
                                Purchase Date
                              </Label>
                              <Input
                                type="Date"
                                className="form-control"
                                id="Date-Input"
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
                              id="Description-Input"
                              placeholder="Enter purchase date"
                              onChange={e => setDescription(e.target.value)}
                            />
                          </div>
                        </Row>

                        <Row>
                          <Col md={12}>
                            <div className="mb-3 mt-2">
                              <Label htmlFor="formrow-Input">Pickup Date</Label>
                              <Input
                                type="Date"
                                className="form-control"
                                id="PicDate-Input"
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
                          <Label htmlFor="formrow-email-Input">Email</Label>
                          <Input
                            type="email"
                            className="form-control"
                            id="formrow-email-Input"
                            placeholder="Enter previuos owner Email ID"
                            onChange={e => setEmail(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-Input">Contact Number</Label>
                          <Input
                            type="Password"
                            className="form-control"
                            id="Number-Input"
                            placeholder="Enter previuos owner contac number"
                            onChange={e => setNumber(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-Input">Address</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="Address-Input"
                            placeholder="Enter your address"
                            onChange={e => setAddress(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-InputCity">City</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-InputCity"
                            placeholder="Enter City"
                            onChange={e => setCity(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-InputState">State</Label>
                          <select
                            id="formrow-InputStaten"
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
                          <Label htmlFor="formrow-InputZip">Zip</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-InputZip"
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
                          id="formrow-customCheck"
                        />
                        <Label
                          className="form-check-Label"
                          htmlFor="formrow-customCheck"
                        >
                          Check me out
                        </Label>
                      </div>
                    </div>
                    <Row>
                      <Col lg={3}>
                        <div className="mb-3"></div>
                      </Col>
                      <Col lg={3}>
                        <div className="mb-3"></div>
                      </Col>
                      <Col lg={3}>
                        <div className="mb-3"></div>
                      </Col>

                      <Col lg={3}>
                        <div className="mb-3"></div>
                      </Col>
                    </Row>

                    {Array.from({ length: quantity }).map((el, idx) => {
                      return (
                          <QuantityGroup key={idx} index={idx} setExtra={setExtra} />
                      )
                    })}

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

const QuantityGroup = ({ index, setExtra }) => {
  const [data, setData] = React.useState({
    id: index,
    eport: "",
    make: "",
    model: "",
    color: ""
  })

  const setEport = (value) => {
    setData(prevState => {
      const { eport, ...other } = prevState
      return { eport: value, ...other }
    })
  } 

  const setMake = (value) => {
    setData(prevState => {
      const { make, ...other } = prevState
      return { make: value, ...other }
    })
  }

  const setModel = (value) => {
    setData(prevState => {
      const { model, ...other } = prevState
      return { model: value, ...other }
    })
  }

  const setColor = (value) => {
    setData(prevState => {
      const { color, ...other } = prevState
      return { color: value, ...other }
    })
  }

  useEffect(() => {
    setExtra(prevState => {
      // const prevData = prevState[index]
      const newExtra = prevState.map((el) => {
        if(el.id == index) {
          return data
        } else {
          return el
        }
      })

      return newExtra
    })
  }, [data])

  return (
    <Row  className="mb-3">
      <Col>
        <Input type="text" className="form-control" onChange={(e) => setEport(e.target.value)} placeholder="Eport" />
      </Col>
      <Col>
        <Input type="text" className="form-control" onChange={(e) => setMake(e.target.value)} placeholder="Make" />
      </Col>
      <Col>
        <Input type="text" className="form-control" onChange={(e) => setModel(e.target.value)} placeholder="Model" />
      </Col>
      <Col>
        <Input type="text" className="form-control" onChange={(e) => setColor(e.target.value)} placeholder="Color" />
      </Col>
    </Row>
  )
}

QuantityGroup.propTypes = {
  index: PropTypes.number,
  setExtra: PropTypes.func
}

export default PurchaseForm
