import React, { Component } from 'react';
import CanvasJSReact from './canvas/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints=[]
export default class menu extends Component {
    componentDidMount(){
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
                                    <h3>150</h3>
                                    <p>New Orders</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-bag" />
                                </div>
                                <a href="abc" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>53<sup style={{fontSize: 20}}>%</sup></h3>
                                    <p>Bounce Rate</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-stats-bars" />
                                </div>
                                <a href="abc" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
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
                                    <p>Unique Visitors</p>
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
                        <div class="card bg-gradient-info">
                            <div class="card-header border-0">
                                <h3 class="card-title">
                                <i class="fas fa-th mr-1"></i>
                                Sales Graph
                                </h3>

                                <div class="card-tools">
                                <button type="button" class="btn bg-info btn-sm" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <button type="button" class="btn bg-info btn-sm" data-card-widget="remove">
                                    <i class="fas fa-times"></i>
                                </button>
                                </div>
                            </div>
                            <div class="card-body">
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
