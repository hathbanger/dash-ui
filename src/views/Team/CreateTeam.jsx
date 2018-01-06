import React, { Component } from 'react';
import{
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, HelpBlock, Form, InputGroup
} from 'react-bootstrap';

import {retrieveUser} from 'actions/userActions'
import {createTeam} from 'actions/teamActions'

import Card from 'components/Card/Card.jsx';

import Select from 'react-select';

import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import Radio from 'elements/CustomRadio/CustomRadio.jsx';

class CreateTeam extends Component{
    constructor(props){
        super(props);
        this.state = {
            radio: "1",
            radioVariant: "1",
            teamName: "",
            teamType: ""
        };
    }
    componentDidMount(){
        if(this.props.user == null){
            this.props.dispatch(retrieveUser())
        }    	
    }
    handleRadio = event => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    };

    formUpdateHandler(e){
        if(e.target.id == "teamName"){
            this.setState({"teamName": e.target.value})
        } else if(e.target.id == "teamType"){
            this.setState({"teamType": e.target.value})
        }
    }

    formSubmitHandler(e) {

        let data = {"teamName":this.state.teamName, "teamType":this.state.teamType, "organization":this.props.organization.id};
        this.props.dispatch(createTeam(data));

    }

    render(){
        let arrayOfIndices = []
        let arrayOfTypes = []
        this.props.teams.forEach(team => {
            let type = team.teamType;
            if(arrayOfIndices.indexOf(type) == -1){
                arrayOfIndices.push({"label":team.teamType,"value":team.teamType})
            }
        })
              
        arrayOfIndices.forEach(i => {
            console.log('i',i)
            arrayOfTypes.push(this.props.teams.filter(team => team.teamType == i.value))
        })

        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Create Team</legend>}
                                content={
                                    <Form horizontal>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Organization
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        placeholder="Disabled input here"
                                                        type="text"
                                                        className="valid"
                                                        disabled
                                                        value={this.props.organization ? this.props.organization.id : "nada"}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>  
                                        <fieldset>
                                            <FormGroup
                                                >
                                                <ControlLabel className="col-sm-2">
                                                    Team Name
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        onChange={e => this.formUpdateHandler(e)}
                                                        placeholder="Team Name"
                                                        type="text"
                                                        id="teamName"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>                                  
                                        <fieldset>
                                            <FormGroup
                                                >
                                                <ControlLabel className="col-sm-2">
                                                    Team Type
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        onChange={e => this.formUpdateHandler(e)}
                                                        type="text"
                                                        placeholder="Team Type"
                                                        id="teamType"
                                                    />
                                                </Col>
                                            </FormGroup>

                                                <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Selected Groups
                                                </ControlLabel>
                                            <Col md={10}>
                                                <Select
                                                    placeholder="Multiple Select"
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    name="multipleSelect"
                                                    value={this.state.multipleSelect}
                                                    options={arrayOfIndices}
                                                    onChange={(value) => { this.setState({ multipleSelect: value})}}
                                                />
                                            </Col>  
                                            </FormGroup> 

                                        </fieldset>
                                        <FormGroup>
                                            <Col md={10} mdOffset={2}>
                                                <Button bsStyle="info" onClick={e => this.formSubmitHandler(e)} fill>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default CreateTeam;
