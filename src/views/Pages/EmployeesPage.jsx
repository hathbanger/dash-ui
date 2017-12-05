import React, { Component } from 'react';
import {
    Table,
    Grid, Row, Col,
    FormGroup,
    ControlLabel, FormControl,
    HelpBlock,
} from 'react-bootstrap';

import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

import Card from 'components/Card/Card.jsx';
import {retrieveUser} from 'actions/userActions'
const thArray = ["id"];

// const {PieChart, Pie, Legend, Tooltip} = Recharts;

const data01 = [{ value: 7.9 }]

const TwoSimplePieChart = React.createClass({
	render () {
  	return (
  		<ResponsiveContainer  width="100%" aspect={2}>
    	<PieChart>
        <Pie isAnimationActive={true} 
        startAngle={0}
        endAngle={360 * (data01[0].value * .1)} data={data01} fill="#8884d8" label/>
       </PieChart>
       </ResponsiveContainer>
    );
  }
})

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class EmployeesPage extends Component{

    constructor(props){
        super(props);
        this.state = {
        };        
    }

    componentDidMount(){
        if(this.props.user == null){
            this.props.dispatch(retrieveUser())
        }        
    }

    render(){
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={6}>
                            <Card
                                title="Current Employees"
                                category="Employees still at the company"
                                tableFullWidth
                                content={
                                    <div>
                                    <Table striped hover responsive>
                                        <thead>
                                            <tr>
                                                {
                                                    thArray.map((prop, key) => {
                                                        return (
                                                            <th  key={key}>{prop}</th>
                                                        );
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.organization &&
                                                this.props.organization.users.map((prop,key) => {
                                                    return (
                                                        <tr key={key}>
                                                            {
                                                                        <td  key={key}>{prop}</td>
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                    <FieldGroup
                                      id="formControlsFile"
                                      type="file"
                                      label="File"
                                      help="Example block-level help text here."
                                    />

                                    </div>
                                }
                            />
                        </Col>
                        <Col md={6}>
                            <Card
                                title="Current thing"
                                category="Employees still at the company"
                                tableFullWidth
                                content={
									<TwoSimplePieChart/>
                                }
                            />                    
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}

export default EmployeesPage;
