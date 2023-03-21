import React, { Component } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import authHeader from '../services/authHeader';
import CanvasJSReact from './canvas/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// set instance defaults
// authHeader()

export default class menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            totDO : 0,
            totalBuyingPrice:0,
            totcustomer:0,
            user:"",
            setUser:"",
            chartData:[],
            chartCustomer:[],
            isiProduct:[],
            isiCustomer:[],
        }

    }
    componentDidMount(){
        // axios.defaults.headers.common['Authorization'] = `x-access-token: ${tokene}`
        console.log(authHeader().header)
        this.getProducts()
        this.getCustomers()
        this.getUser()
        this.getDeliveryOrders()
        this.getInvoice()
        this.chartDO()
        this.chartCust()

    }
    getUser= async()=>{
        await axios.get('http://localhost:3001/api/users')
    }

    getProducts(){      
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


    getDeliveryOrders(){
        axios.get('http://localhost:3001/api/delivery_orders/total')
        .then((res)=>{
            const abc = res.data.result.items
            let aaa = ''
            abc.forEach((item)=>{
                aaa = item.deliveryOrderItems
            })
            const emptyArr = [{ totalBP: 0, totalSP: 0 }]
            const totBP = aaa.length? aaa.reduce((a,v) =>  a = a +parseInt(v.totalBP) , 0 ): emptyArr[0].totalBP
            const totSP = aaa.length? aaa.reduce((a,v) =>  a = a + parseInt(v.totalSP) , 0 ): emptyArr[0].totalSP
            const converttotBP = Number(totBP).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            const converttotSP = Number(totSP).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            this.setState({
                totalBuyingPrice:converttotBP,
                totalSP:converttotSP
            })

        })
    }

    getInvoice(){
        axios.get('http://localhost:3001/api/invoice')
        .then((res)=>{
            const abc = res.data.result.items
            const totAmount = (abc.reduce((a,v) =>  a = a + v.amount , 0 ))
            const amount = Number(totAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            this.setState({
                totalAmount:amount
            })

        })
    }


    chartDO(){
        axios.get('http://localhost:3001/api/delivery_orders/chart')
        .then((res)=>{ 
            this.setState({
                isiProduct:res.data.result
            })
        })
     
    }
    chartCust(){
        axios.get('http://localhost:3001/api/delivery_orders/chart/customer')
        .then((res)=>{
            this.setState({
                isiCustomer:res.data.result
            })
        })
    }

    render() {
        const chartData = []
        const chartCustomer = []

        this.state.isiProduct.map((product) => {
            chartData.push({
              label: product.products.name,
              y:parseInt(product.totalQTY)
            })
        })
        const optionsProduct = {
			theme: "light2",
			title: {
				text: "Grafik Penjualan Ikan"
			},
			axisY: {
				title: "Qty",
				prefix: "Kg "
			},
            data: [{
                type: "column",
                dataPoints:chartData
            }]
            
		}
        this.state.isiCustomer.map((customer) => {
            chartCustomer.push({
              label: customer.customers.name,
              y:parseInt(customer.totalQTY)
            });
        });
        const optionsCustomer = {
			theme: "light2",
			title: {
				text: "Grafik Order Customer"
			},
			axisY: {
				title: "Qty",
				prefix: "Kg "
			},
            data: [{
                type: "column",
                dataPoints: chartCustomer
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
                                    <h3>Rp. {this.state.totalBuyingPrice}</h3>
                                    <p>Total Buying Price</p>
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
                                <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>Rp. {this.state.totalSP}</h3>
                                    <p>Total Selling Price</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-person-add" />
                                </div>
                                <a href="abc" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>Rp. {this.state.totalAmount}</h3>
                                    <p>Total Amount</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-person-add" />
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
                                Product Graph
                                {/* {this.state.setData} */}
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
                                <canvas className="chart" id="line-chart" style={{minHeight: '250px', height: '250px', maxHeight: '250px', maxWidth: '100%'}}></canvas>
                                <CanvasJSChart options={optionsProduct} onRef={ref => this.chart = ref}/>
                            </div>

                        </div>
                         <div className="card bg-gradient-info">
                            <div className="card-header border-0">
                                <h3 className="card-title">
                                <i className="fas fa-th mr-1"></i>
                                Customer Graph
                                {/* {this.state.setData} */}
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
                                <canvas className="chart" id="line-chart" style={{style:"min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"}}></canvas>
                                <CanvasJSChart options = {optionsCustomer} onRef={ref => this.chart = ref}/>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
