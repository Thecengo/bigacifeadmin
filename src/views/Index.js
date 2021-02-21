import React from "react";
// node.js library that concatenates classes (strings)
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import MessageService from "services/MessageService";

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.setState({
      messages :[]
    })
  
    MessageService.getMessages().then(res =>
      res.data.map(data =>
        this.setState(state => {
          const messages = state.messages.concat(data)
          console.log("dataa....", data)
          return { messages, }
        })
      )
    )
  }
  
 getMessages = () => {
    MessageService.getMessages().then(res => console.log(res.data))
  }
  render() {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Mesajlar</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Ad</th>
                    <th scope="col">Mesaj </th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                {
                      this.state.messages.map(message => (
                        <tr key={message.id}>
                          <td>{message.name}</td>
                          <td>{message.message}</td>
                          <td>{message.email}</td>
                        </tr>
                      ))
                    }
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
}

export default Index;
