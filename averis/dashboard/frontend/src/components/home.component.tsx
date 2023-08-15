import { Component, ChangeEvent } from "react";
import { Routes, Route, Link } from "react-router-dom";

import AuthService from "../services/auth.service";
import IUser from '../types/user.type';
import Login from "./login.component";
import Register from "./register.component";
import EventBus from "../common/EventBus";

import ProductDataService from "../services/product.service";
import IProductData from '../types/product.type';

import Chart from 'chart.js/auto';
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

import {CategoryScale} from 'chart.js';
Chart.register(CategoryScale);

const labels = ["Mobile Phone", "Laptop", "Refrigerator"];

const initdata = {
  labels: labels,
  datasets: [
    {
      label: "",
      backgroundColor: ["#007D9C", "#D123B3", "#FE452A"],
      borderColor: ["rgba(255,99,132,1)", "rgba(255, 206, 86, 1)", "rgba(153, 102, 255, 1)"],
      data: [1, 1, 1]
    },
  ]
};

type Props = {};

type State = {
  currentUser: IUser | undefined,
  products: Array<IProductData>,
  currentIndex: number,
  searchCountry: string,
  searchCategory: number,
  chartData: any | undefined
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.onChangeSearchCountry = this.onChangeSearchCountry.bind(this);
    this.onChangeSearchCategory = this.onChangeSearchCategory.bind(this);
    this.searchFilters = this.searchFilters.bind(this);

    this.state = {
      currentUser: undefined,
      products: [],
      currentIndex: -1,
      searchCountry: "",
      searchCategory: -1,
      chartData: initdata
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  onChangeSearchCountry(e: ChangeEvent<HTMLInputElement>) {
    const searchCountry = e.target.value;

    this.setState({
      searchCountry: searchCountry
    });
  }

  onChangeSearchCategory(e: ChangeEvent<HTMLInputElement>) {
    let icat = 0;
    try {
      icat = (e.target.value != '0' && e.target.value != '1' && e.target.value != '2' && e.target.value != '3' && e.target.value != '4'
      && e.target.value != '5' && e.target.value != '6' && e.target.value != '7' && e.target.value != '8' && e.target.value != '9') ? 0 : parseInt(e.target.value);
    } catch (err) {
      icat = -1;
    }

    this.setState({
        searchCategory: icat
    });
  }

  searchFilters() {
    this.setState({
      currentIndex: -1
    });

    ProductDataService.findByCtryNCat(this.state.searchCountry, this.state.searchCategory)
      .then((response: any) => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });

    ProductDataService.stats(this.state.searchCountry, this.state.searchCategory)
      .then((response: any) => {
        this.setChartData(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  setActiveProduct(index: number) {
    this.setState({
      currentIndex: index
    });
  }

  setChartData(chartdata: any) {
    const lcdata = chartdata[0] ? (
      {
        labels: chartdata.map((data:any) =>
          data.category == 1 ? "Mobile Phone" : data.category == 2 ? "Laptop" : "Refrigerator"
        ),
        datasets: [
          {
            data: chartdata.map((data:any) => data.count),
            label: "count",
            backgroundColor: ["#007D9C", "#D123B3", "#FE452A"],
            borderColor: ["rgba(255,99,132,1)", "rgba(255, 206, 86, 1)", "rgba(153, 102, 255, 1)"],
            fill: true
          }
        ]
      }
    ) : null;

    this.setState({
      chartData: lcdata
    });
  }

  render() {
    const { currentUser, searchCountry, searchCategory, products, currentIndex, chartData } = this.state;

    return (
      <div className="">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Welcome, {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>

        {/* Chart */}
        <div className="col-md-8">
          <div className="input-group mb-3">
            <div style={{ width: 200, height: 200 }}>
              <h6 style={{ fontFamily: "monospace" }}>
                Electronic Products by Category (Pie)
              </h6>
              <Pie data={chartData} width={50} height={50} />
            </div>
            <div className="chart">
              <h6 style={{ fontFamily: "monospace" }}>
                Electronic Products by Category (Bar)
              </h6>
              <Bar data={chartData} />
            </div>
            <div className="chart">
              <h6 style={{ fontFamily: "monospace" }}>
                Electronic Products by Category (Line)
              </h6>
              <Line data={chartData} />
            </div>
          </div>
        </div>
        { /* Searching */ }
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by country"
              value={searchCountry}
              onChange={this.onChangeSearchCountry}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Search by category"
              value={searchCategory}
              onChange={this.onChangeSearchCategory}
            />
            <div className="input-group-append btn-search">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchFilters}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        { /* Tabular data list */ }
        <div className="tabular">
          <div className="col-md-6">
            <h4>Product List</h4>

            <ul className="list-group">
            {products && products.map((product: IProductData, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  key={index}
                >
                  {product.name}
                </li>
              ))}
          </ul>
          </div>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}