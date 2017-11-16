import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
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

var dataSales = {
  labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '10:PM', '12:00PM', '3:00AM', '6:00AM'],
  series: [
    [23, 113, 67, 108, 190, 239, 307, 308]
  ]
};

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            surveyRetrieve: false,
            dataPieSeriesData: [7.84]
        }

    }    
    componentDidMount(){
        this.setState({surveyRetrieve: true})
        if(this.props.user == null){
            this.props.dispatch(retrieveUser())
        }
        if(this.props.surveys.length){
            let sereneArr = []
            if(this.props.surveys){
                this.props.surveys.forEach(function(survey){
                    sereneArr.push(parseInt(survey.content[1][1].answer));
                })
                console.log("sereneArr", sereneArr)
                let count = sereneArr.length;          
                // if(this.props.surveys.length == data.length){
                let sum = sereneArr.reduce((previous, current) => current += previous);
                let avg = Math.round(100*(sum / sereneArr.length))/100; 
                this.setState({dataPieSeriesData: [avg]})
            }            
        }
    }
    
    render(){
        let org = this.props.organization !== null ? this.props.organization.users.length : this.props.organization;
        return (
            <div className="main-content">
            {this.props.organization !== null &&
                <Grid fluid>
                    <Row>
                        <Col lg={6} sm={6}>
                            <StatsCard
                                bigIcon={<i className="fa fa-user text-warning"></i>}
                                statsText="Employees"
                                statsValue={org}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="Updated now"
                            />
                        </Col>
                        <Col lg={6} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-graph1 text-success"></i>}
                                statsText="Survey's Taken"
                                statsValue={this.props.organization.surveys.length}
                                statsIcon={<i className="fa fa-calendar-o"></i>}
                                statsIconText="Last day"
                            />
                        </Col>
                    </Row>

                <Row>
                    <Col md={4}>
                        <Card
                            title="Serene Factor"
                            category="General happiness"
                            content={
                                <ChartistGraph data={{series: this.state.dataPieSeriesData}} options={options} type="Pie"/>
                            }
                            stats={
                                <div>
                                    <i className="fa fa-clock-o"></i> Campaign sent 2 days ago
                                </div>
                            }
                        />
                    </Col>
                    <Col md={8}>
                        <Card
                            title="Users Behavior"
                            category="24 Hours performance"
                            content={
                                <ChartistGraph
                                    data={dataSales}
                                    type="Line"
                                    options={optionsSales}
                                    responsiveOptions={responsiveSales}/>
                                }
                                legend={
                                    <div>
                                        <i className="fa fa-circle text-info"></i> Open
                                        <i className="fa fa-circle text-danger"></i> Click
                                        <i className="fa fa-circle text-warning"></i> Click Second Time
                                    </div>
                                }
                                stats={
                                    <div>
                                        <i className="fa fa-history"></i> Updated 3 minutes ago
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

export default Dashboard;