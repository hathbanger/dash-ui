import React, { Component } from 'react';
import{
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, HelpBlock, Form, InputGroup,
} from 'react-bootstrap';

import Select from 'react-select';

import {retrieveUser} from 'actions/userActions'
import {createCampaign} from 'actions/campaignActions'

import Card from 'components/Card/Card.jsx';

import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import Radio from 'elements/CustomRadio/CustomRadio.jsx';

var selectOptions = [
  { value: 'id', label: 'Bahasa Indonesia' },
  { value: 'ms', label: 'Bahasa Melayu' },
  { value: 'ca', label: 'Català' },
  { value: 'da', label: 'Dansk' },
  { value: 'de', label: 'Deutsch' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'el', label: 'Eλληνικά' },
  { value: 'fr', label: 'Français' },
  { value: 'it', label: 'Italiano' },
  { value: 'hu', label: 'Magyar' },
  { value: 'nl', label: 'Nederlands' },
  { value: 'no', label: 'Norsk' },
  { value: 'pl', label: 'Polski' },
  { value: 'pt', label: 'Português' },
  { value: 'fi', label: 'Suomi' },
  { value: 'sv', label: 'Svenska' },
  { value: 'tr', label: 'Türkçe' },
  { value: 'is', label: 'Íslenska' },
  { value: 'cs', label: 'Čeština' },
  { value: 'ru', label: 'Русский' },
  { value: 'th', label: 'ภาษาไทย' },
  { value: 'zh', label: '中文 (简体)' },
  { value: 'zh-TW', label: '中文 (繁體)' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' }
];

class CreateCampaign extends Component{
    constructor(props){
        super(props);
        this.state = {
            radio: "1",
            radioVariant: "1",
            teamName: "",
            teamType: "",
            singleSelect: null,
            multipleSelect: null,
            question1:"",
            question2:"",
            question3:""
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
        if(e.target.id == "question1"){
            this.setState({"question1": e.target.value})
        } else if(e.target.id == "question2"){
            this.setState({"question2": e.target.value})
        } else if(e.target.id == "question3"){
            this.setState({"question3": e.target.value})
        }
    }

    formSubmitHandler(e) {

        let data = {"organizationId":this.props.organization.id,"questions":[this.state.question1, this.state.question2, this.state.question3]};
        this.props.dispatch(createCampaign(data));

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
                                                        placeholder="Disabled input here"
                                                        type="text"
                                                        className="valid"
                                                        disabled
                                                        value={this.props.organization ? this.props.organization.id : "nada"}
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
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Question 1
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        placeholder="Question 1"
                                                        type="text"
                                                        className="valid"
                                                        id="question1"
                                                        onChange={e => this.formUpdateHandler(e)}
                                                    />
                                                </Col>
                                            </FormGroup>  
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Question 2
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        placeholder="Question 2"
                                                        type="text"
                                                        className="valid"
                                                        id="question2"
                                                        onChange={e => this.formUpdateHandler(e)}
                                                    />
                                                </Col>
                                            </FormGroup>  
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Question 3
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        placeholder="Question 3"
                                                        type="text"
                                                        className="valid"
                                                        id="question3"
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
export default CreateCampaign;
