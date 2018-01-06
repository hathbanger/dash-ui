import React, { Component } from 'react';
import { Grid, Col, Row, Table, Button } from 'react-bootstrap';
// react component used to create charts
import ChartistGraph from 'react-chartist';
// function that returns a color based on an interval of numbers
import { scaleLinear } from "d3-scale";


import { Link } from 'react-router-dom';

import {retrieveOrganization} from 'actions/organizationActions'
import {retrieveSurveys} from 'actions/surveyActions'
import {retrieveUser} from 'actions/userActions'
import {startCampaign} from 'actions/campaignActions'

import {timeSince} from 'utility/utilityFunctions'


import Card from 'components/Card/Card.jsx';
import StatsCard from 'components/Card/StatsCard.jsx';
import Tasks from 'components/Tasks/Tasks.jsx';

import {
    optionsSales,
    responsiveSales,
    dataBar,
    optionsBar,
    responsiveBar,
    table_data
} from 'variables/Variables.jsx';

const colorScale = scaleLinear()
.domain([0, 1, 6820])
.range(["#E5E5E5", "#B2B2B2", "#000000"]);

var dataPie = {
    series: [8.9]
};
const options = {
    total: 10,
    donut: true,
    // startAngle: 270
};
const thArray = ["users","questions","complete surveys","created"];


class Campaigns extends Component{
    constructor(props){       
        super(props);
        this.state = {
            surveyRetrieve: false,
            dataPieSeriesData: [0],
            sereneRatingCount: 0,
            surveyFinishedCount: 0
        }
      

    }    
    componentDidMount(){
        this.setState({surveyRetrieve: true})
        if(this.props.user == null){
            this.props.dispatch(retrieveUser())
        }
        if(this.props.surveys.length){
            let sereneArr = []
            let ratingArr = []
            let finishedArr = []


            if(this.props.surveys){
                this.props.surveys.forEach(function(survey){
                    if(survey.finished){
                        finishedArr.push(survey)
                    }

                    survey.answers.forEach(function(answer){

                        if(parseInt(answer)){
                            console.log("Answer", parseInt(answer))
                            ratingArr.push(parseInt(answer))
                        }

                    });
                });

                    let count = ratingArr.length
                    this.setState({sereneRatingCount: ratingArr.length});         
                    this.setState({surveyFinishedCount: finishedArr.length});         

                    if(ratingArr.length > 0){
                        let sum = ratingArr.reduce((previous, current) => current += previous);
                        let avg = Math.round(100*(sum / ratingArr.length))/100; 
                        this.setState({dataPieSeriesData: [avg]})
                    }

            }            
        }
    }



    
    render(){
        return (
            <div className="main-content">
            {this.props.organization !== null &&
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Campaigns"
                                category=""
                                tableFullWidth
                                className="text-center"
                                content={
                                    <div>
                                    <Table striped hover responsive>
                                        <thead>
                                            <tr>
                                                {
                                                    thArray.map((prop, key) => {
                                                        return (
                                                            <th className="text-center"  key={key}>{prop}</th>
                                                        );
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.campaigns &&
                                                this.props.campaigns.map((prop,key) => {
                                                    let started = prop.started;
                                                    console.log("prop.organizationId, prop.id",prop)
                                                    return (
                                                        <tr className="text-center" key={prop.id}>
                                                            {
                                                                        <td >{prop.users.length}</td>
                                                            }
                                                            {
                                                                        <td >{prop.questions.length}</td>
                                                            }
                                                            {
                                                                        <td >{prop.surveys.length}</td>
                                                            }
                                                            {
                                                                        <td >{timeSince(new Date(prop.time))}</td>
                                                            }
                                                            {!started &&
                                                                        <td >
                                                                            <Button
                                                                                disabled={started}
                                                                                bsStyle="success"
                                                                                onClick={e => this.props.dispatch(startCampaign(prop.organizationId, prop.id))}>{!started ? "Start" : "Started"}</Button>
                                                                        </td>
                                                            }
                                                            {started &&
                                                                        <td >
                                                                            <Link to={`/campaigns/${prop.id}`}>
                                                                                <Button
                                                                                    bsStyle="info"
                                                                                    disabled={!started}>View</Button>
                                                                            </Link>
                                                                        </td>
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            }
            </div>
        );
    }
}

export default Campaigns;

