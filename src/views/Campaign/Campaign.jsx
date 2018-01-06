import React, { Component } from 'react';
import { Grid, Col, Row, Table } from 'react-bootstrap';
// react component used to create charts
import ChartistGraph from 'react-chartist';
// function that returns a color based on an interval of numbers
import { scaleLinear } from "d3-scale";

import {retrieveOrganization} from 'actions/organizationActions'
import {retrieveSurveys} from 'actions/surveyActions'
import {retrieveUser} from 'actions/userActions'


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


var biPolarLineChartOptions = {
  high: 10,
  low: 0,
  showArea: false,
  showLine: true,
  showPoint: false,
  axisX: {
    showLabel: false,
    showGrid: false
  }
}

class Campaigns extends Component{
    constructor(props){
        var dataSales = {
          labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '10:PM', '12:00PM', '3:00AM', '6:00AM'],
          series: [
            [Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10],
            [Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10],
            [Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10],
            [Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10],
            [Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10],
            [Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10]
          ]
        };          
        super(props);
        this.state = {
            surveyRetrieve: false,
            dataPieSeriesData: [0],
            sereneRatingCount: 0,
            surveyFinishedCount: 0,
            dataSales: dataSales
        }
      

    }    
    componentDidMount(){
        this.setState({surveyRetrieve: true})
        if(this.props.user == null){
            this.props.dispatch(retrieveUser())
        }

        let campaignId = this.props.location.pathname.split("/")[this.props.location.pathname.split("/").length - 1];

        let campaign = this.props.campaigns.find(campaign => campaign.id == campaignId);

        var filteredSurveys = this.props.surveys.filter(survey => survey.campaign == campaign.id);

        console.log("filteredSurveys",filteredSurveys)

        if(filteredSurveys.length){
            let sereneArr = []
            let ratingArr = []
            let finishedArr = []
            if(filteredSurveys){
                filteredSurveys.forEach(function(survey){

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
                // if(filteredSurveys.length == ratingArr.length){
                    if(ratingArr.length > 0){
                        console.log("ratingArr", ratingArr)
                        let sum = ratingArr.reduce((previous, current) => current += previous);
                        let avg = Math.round(100*(sum / ratingArr.length))/100; 
                        this.setState({dataPieSeriesData: [avg]})
                    }
                // }
            }            
        }
    }

    teamGrabber(teams, teamName){
        let returnedTeam
        teams.forEach(team => {
            if(team.teamName == teamName){
                returnedTeam = team
            }
        })        
        return returnedTeam
    }
    
    render(){


        let campaignId = this.props.location.pathname.split("/")[this.props.location.pathname.split("/").length - 1];

        let campaign = this.props.campaigns.find(campaign => campaign.id == campaignId);

        console.log('campaign',campaign)

        return (
            <div className="main-content">
            {campaign !== null &&
                <Grid fluid>
                    <Row>
                        <Col lg={4} sm={4}>
                            <StatsCard
                                bigIcon={<i className="fa fa-user text-warning"></i>}
                                statsText="Employees"
                                statsValue={campaign.users.length}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="Updated now"
                            />
                        </Col>
                        <Col lg={4} sm={4}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-graph1 text-success"></i>}
                                statsText="Survey's Sent"
                                statsValue={campaign.surveys.length}
                                statsIcon={<i className="fa fa-calendar-o"></i>}
                                statsIconText="Last day"
                            />
                        </Col>
                        <Col lg={4} sm={4}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-graph1 text-success"></i>}
                                statsText="Survey's Finished"
                                statsValue={this.state.surveyFinishedCount}
                                statsIcon={<i className="fa fa-calendar-o"></i>}
                                statsIconText="Last day"
                            />
                        </Col>
                    </Row>

                <Row>
                    <Col md={4}>
                        <Card
                            title="Serene Factor" 
                            category={`General happiness`}
                            content={
                                <ChartistGraph data={{series: this.state.dataPieSeriesData}} options={options}  type="Pie"/>
                            }
                            stats={
                                <div>
                                    <i className="fa fa-clock-o"></i>{`based on ${this.state.sereneRatingCount} employees`}
                                </div>
                            }
                        />
                    </Col>
                    <Col md={8}>
                                    <Table striped hover responsive>
                                        <thead>
                                            <tr>

                                                            <th>question</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {campaign &&
                                                campaign.questions.map((prop,key) => {
                                                    return (
                                                        <tr key={prop}>
                                                            {
                                                                        <td >{prop}</td>
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                    </Col>
                    </Row>
                </Grid>
            }
            </div>
        );
    }
}

export default Campaigns;

