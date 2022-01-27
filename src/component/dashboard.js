import React, { Component } from 'react';

import { useHistory } from 'react-router-dom';
import axios from 'axios';
import CanvasJSReact from './canvas/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// const token = localStorage.getItem("token");
// const history = useHistory();

var dataPoints=[]
export default class menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            totprod : 0,
            totcustomer:0
        }

    }   
        token(){
            localStorage.getItem("token")
        }
        componentDidMount(){
            console.log(this.props.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`
            var chart = this.chart;
            fetch('https://canvasjs.com/data/gallery/react/nifty-stock-price.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    dataPoints.push({
                        x: new Date(data[i].x),
                        y: data[i].y
                    });
                }
                chart.render();
            });
            this.getProducts()
            this.getCustomers()

        }
        getProducts(){
            // console.log(token)            
            axios.get('http://localhost:3001/api/products')
            .then((res)=>{
                const count = res.data.result.count
                this.setState({
                    totprod:count,
                })

            })
        }

        getCustomers(){
            axios.get('http://localhost:3001/api/customers')
            .then((res)=>{
                const count = res.data.result.count
                this.setState({
                    totcustomer:count,
                })
            })
        }
        useEffect(){

        //check token empty
        if(!this.props.token) {

            //redirect login page
            useHistory.push('/');
        }
        
        //call function "fetchData"
        this.fetchData();
    }

    render() {
        const options = {
			theme: "light2",
			title: {
				text: "Stock Price of NIFTY 50"
			},
			axisY: {
				title: "Price in USD",
				prefix: "$"
			},
			data: [{
				type: "line",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.00",
				dataPoints: dataPoints
			}]
		}
        return (
            <div>
               {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">
                {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                            <h1 className="m-0">Dashboard</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item active">Dashboard v1</li>
                            </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                        </div>{/* /.container-fluid */}
                    </div>
                     {/* /.content-header */}
                    {/* Main content */}
                    <section className="content">
                    <div className="container-fluid">
                            {/* Small boxes (Stat box) */}
                            <div className="row">
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>{this.state.totprod}</h3>
                                    <p>Products</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-bag" />
                                </div>
                                <a href="/product" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>{this.state.totcustomer}</h3>
                                    <p>Customers</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-user-plus"/>
                                </div>
                                <a href="/customers" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>44</h3>
                                    <p>User Registrations</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-person-add" />
                                </div>
                                <a href="abc" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>65</h3>
                                    <p>month's Total </p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-pie-graph" />
                                </div>
                                <a href="abc" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            {/* ./col */}
                            </div>
                        </div>
                       {/*solid sales graph */}
                        <div className="card bg-gradient-info">
                            <div className="card-header border-0">
                                <h3 className="card-title">
                                <i className="fas fa-th mr-1"></i>
                                Sales Graph
                                </h3>

                                <div className="card-tools">
                                <button type="button" className="btn bg-info btn-sm" data-card-widget="collapse">
                                    <i className="fas fa-minus"></i>
                                </button>
                                <button type="button" className="btn bg-info btn-sm" data-card-widget="remove">
                                    <i className="fas fa-times"></i>
                                </button>
                                </div>
                            </div>
                            <div className="card-body">
                                {/* <canvas class="chart" id="line-chart" style={{style:"min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"}}></canvas> */}
                                <CanvasJSChart options = {options} onRef={ref => this.chart = ref}/>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
