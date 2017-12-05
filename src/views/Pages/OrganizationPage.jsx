import React, { Component } from 'react';
import {
    FormGroup, ControlLabel, FormControl,
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import FormInputs from 'components/FormInputs/FormInputs.jsx';
import UserCard from 'components/Card/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import {retrieveOrganization} from 'actions/organizationActions'
import {retrieveUser} from 'actions/userActions'



class OrganizationPage extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        if(this.props.user == null){
            this.props.dispatch(retrieveUser())
        }
    }    
    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={8}>
                            <Card
                                title="Edit Organization Profile"
                                content={
                                    <form>
                                        <FormInputs
                                            ncols = {["col-md-6" , "col-md-6"]}
                                            proprieties = {[
                                                {
                                                 label : "Company (disabled)",
                                                 type : "text",
                                                 bsClass : "form-control",
                                                 placeholder : "Company",
                                                 defaultValue : this.props.organization ? this.props.organization.organizationName : "",
                                                 disabled : false
                                                },
                                                {
                                                 label : "Email address",
                                                 type : "email",
                                                 bsClass : "form-control",
                                                 placeholder : "Email"
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols = {["col-md-12"]}
                                            proprieties = {[
                                                {
                                                    label : "Adress",
                                                    type : "text",
                                                    bsClass : "form-control",
                                                    placeholder : "Home Adress",
                                                    defaultValue : "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols = {["col-md-4","col-md-4","col-md-4"]}
                                            proprieties = {[
                                                {
                                                    label : "City",
                                                    type : "text",
                                                    bsClass : "form-control",
                                                    placeholder : "City",
                                                    defaultValue : "City"
                                                },
                                                {
                                                    label : "Country",
                                                    type : "text",
                                                    bsClass : "form-control",
                                                    placeholder : "Country",
                                                    defaultValue : "Country"
                                                },
                                                {
                                                    label : "Postal Code",
                                                    type : "number",
                                                    bsClass : "form-control",
                                                    placeholder : "ZIP Code"
                                                }
                                            ]}
                                        />
                                        <Button
                                            bsStyle="info"
                                            pullRight
                                            fill
                                            type="submit"
                                        >
                                            Update Profile
                                        </Button>
                                        <div className="clearfix"></div>
                                    </form>
                                }                           
                            />  
                        </Col>
                        <Col md={4}>
                            <UserCard
                                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                                avatar={"https://www.icbr.org/wp-content/uploads/2014/05/Avatar.jpg"}
                                name={this.props.organization ? this.props.organization.organizationName : ""}
                                description={
                                    <span>
                                        We're a top notch business, doing top notch things..
                                    </span>
                                }
                                socials={
                                    <div>
                                        <Button simple><i className="fa fa-facebook-square"></i></Button>
                                        <Button simple><i className="fa fa-twitter"></i></Button>
                                        <Button simple><i className="fa fa-google-plus-square"></i></Button>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Card
                            title="Add Employees"
                            content={
                                <form>
                                        <FormInputs
                                            ncols = {["col-md-12"]}
                                            proprieties = {[
                                                {
                                                    label : "Link to add more employees",
                                                    type : "text",
                                                    className: "text-center",
                                                    bsClass : "form-control",
                                                    placeholder : window.location.host + "/auth/register-page?organization=5a0d06eb2c97a62982000004",
                                                    value : window.location.host + "/auth/register-page?organization=5a0d06eb2c97a62982000004"
                                                }
                                            ]}
                                        />                                
                                    <label className="custom-file">
                                      <input type="file" id="file" className="custom-file-input"/>
                                      <span className="custom-file-control"></span>
                                    </label> 
                                    <Button
                                        bsStyle="info"
                                        pullRight
                                        fill
                                        type="submit"
                                    >
                                        Upload File
                                    </Button>
                                    <div className="clearfix"></div>
                                </form>
                            }                           
                        />
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default OrganizationPage;
