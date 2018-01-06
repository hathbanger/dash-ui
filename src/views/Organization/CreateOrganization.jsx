import React, { Component } from 'react';
import{
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, HelpBlock, Form, InputGroup,
} from 'react-bootstrap';

import Select from 'react-select';

import {retrieveUser} from 'actions/userActions'
import {createOrganization} from 'actions/organizationActions'

import Card from 'components/Card/Card.jsx';

import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import Radio from 'elements/CustomRadio/CustomRadio.jsx';

class CreateOrganization extends Component{
    constructor(props){
        super(props);
        this.state = {
            radio: "1",
            radioVariant: "1",
            organizationName: ""
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
        if(e.target.id == "organizationName"){
            this.setState({"organizationName": e.target.value})
        }
    }

    formSubmitHandler(e) {
        this.props.dispatch(createOrganization({"organizationName":this.state.organizationName}));
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
            arrayOfTypes.push(this.props.teams.filter(team => team.teamType == i.value))
        })


        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Create Campaign</legend>}
                                content={
                                    <Form horizontal>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Organization
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        placeholder="Organization Name"
                                                        type="text"
                                                        className="valid"
                                                        id="organizationName"
                                                        onChange={e => this.formUpdateHandler(e)}
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
export default CreateOrganization;
