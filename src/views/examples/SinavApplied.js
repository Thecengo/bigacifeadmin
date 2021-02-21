import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Input,
  Col,
  Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import SessionService from "services/SessionService";
import SinavService from "services/SinavService";
import StudentService from "services/StudentService";

class SinavApplied extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      sinavType: ' ',
      session: ' ',
      sessionOptions: [''],
      sinavTypes: ['']
    }
  }
  componentDidMount() {
    this.setState({
      sessionOptions: [],
      sinavTypes: []
    })
    let initialSinavType;
    SinavService.getSinavTypes().then(res =>
      res.data.map(data =>
        this.setState(state => {
          const sinavTypes = state.sinavTypes.concat(data)
          if (!initialSinavType) {
            initialSinavType = sinavTypes[0];
            state.sinavType = initialSinavType;
            this.getSessionsByType(initialSinavType);
          }
          return { sinavTypes, }
        })
      )
    )
  }

  getStudentsBySinavTypeAndSessionStartTime = (type, startTime) => {
    StudentService.getStutudentsBySinavTypeAndSessionStartTime(type, startTime)
      .then(res => {
        res.data.map(data =>
          this.setState(state => {
            const students = state.students.concat(data)
            return { students, }
          })
        )
      })
  }

  getSessionsByType = (type) => {
    let initialSessionType;
    SessionService.getSessionsBySinavType(type)
      .then(res => {
        res.data.map(data =>
          this.setState(state => {
            if (!initialSessionType) {
              initialSessionType = data.startTime
              state.session = initialSessionType
            }
            const sessionOptions = state.sessionOptions.concat(data.startTime)
            return { sessionOptions, }
          })
        )
      })

  }

  search = () => {
    console.log("search sinav tipi", this.state.sinavType)
    console.log("search session", this.state.session)
    this.getStudentsBySinavTypeAndSessionStartTime(this.state.sinavType, this.state.session);
  }

  onChange = e => {
    const { name, value } = e.target;
    if (name === 'sinavType') {
      this.setState({
        sessionOptions: []
      })
      SessionService.getSessionsBySinavType(value)
        .then(res => {
          res.data.map(data =>
            this.setState(state => {
              const sessionOptions = state.sessionOptions.concat(data.startTime)
              return { sessionOptions, }
            })
          )
        })
    }
    if (value !== '') {
      this.setState({
        [name]: value
      })
    }
  }
  render() {
    return (
      <>
        <Header />
        <Row>
          <Col className="mt--7" fluid>
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <label>Sınav tipi</label>
                    <Input type="select" name="sinavType"
                      value={this.state.sinavType} onChange={this.onChange} >
                      {this.state.sinavTypes.map((sinav) => (
                        <option value={sinav}>{sinav}</option>
                      ))}
                    </Input>
                  </div>
                  <div className="col">
                    <label>Oturum</label>
                    <Input type="select" name="session"
                      value={this.state.session} onChange={this.onChange} >
                      {this.state.sessionOptions.map((option) => (
                        <option value={option}>{option}</option>
                      ))}
                    </Input>
                  </div>
                  <div className="col">
                    <label>Başvuruları Göster</label>
                    <Button block className="btn-round" color="primary" onClick={this.search}>
                      Ara
                  </Button>
                  </div>
                </Row>
              </CardHeader>
            </Card>
          </Col>
        </Row>
        {/* Page content */}
        
        <Container className="mt--4" xl ="12"fluid>
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Sınava Başvuran Öğrenciler</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Öğrenci Adı</th>
                      <th scope="col">Okul Adı</th>
                      <th scope="col">Sınıfı</th>
                      <th scope="col">Öğrenci Tel No</th>
                      <th scope="col">Tc no</th>
                      <th scope="col">Veli adı</th>
                      <th scope="col">Veli Telefon Numarası</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.students.map(student => (
                        <tr key={student.tcNo}>
                          <td>{student.studentName}</td>
                          <td>{student.schoolName}</td>
                          <td>{student.sinif}</td>
                          <td>{student.studentTelNo}</td>
                          <td>{student.tcNo}</td>
                          <td>{student.veliAdi}</td>
                          <td>{student.veliTelNo}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  };
}

export default SinavApplied;
