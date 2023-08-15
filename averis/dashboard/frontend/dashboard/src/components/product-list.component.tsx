import { Component, ChangeEvent } from "react";
import ProductDataService from "../services/product.service";
import { Link } from "react-router-dom";
import IProductData from '../types/product.type';

type Props = {};

type State = {
  products: Array<IProductData>,
  currentProduct: IProductData | null,
  currentIndex: number,
  searchCountry: string,
  searchCategory: number,
};

export default class ProductList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchCountry = this.onChangeSearchCountry.bind(this);
    this.onChangeSearchCategory = this.onChangeSearchCategory.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.removeAllProducts = this.removeAllProducts.bind(this);
    this.searchFilters = this.searchFilters.bind(this);

    this.state = {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      searchCountry: "",
      searchCategory: -1
    };
  }

  componentDidMount() {
    this.retrieveProducts();
  }

  onChangeSearchCountry(e: ChangeEvent<HTMLInputElement>) {
    const searchCountry = e.target.value;

    this.setState({
      searchCountry: searchCountry
    });
  }

  onChangeSearchCategory(e: ChangeEvent<HTMLInputElement>) {
    const searchCategory = Number(e.target.value);

    this.setState({
        searchCategory: searchCategory
    });
  }

  retrieveProducts() {
    ProductDataService.getAll()
      .then((response: any) => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProducts();
    this.setState({
      currentProduct: null,
      currentIndex: -1
    });
  }

  setActiveProduct(product: IProductData, index: number) {
    this.setState({
      currentProduct: product,
      currentIndex: index
    });
  }

  removeAllProducts() {
    ProductDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  searchFilters() {
    this.setState({
      currentProduct: null,
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
  }

  render() {
    const { searchCountry, searchCategory, products, currentProduct, currentIndex } = this.state;

    return (
      <div className="row tabular2">
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
            <div className="input-group-append">
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
        <div className="col-md-6">
          <h4>Product List</h4>

          <ul className="list-group">
            {products && products.map((product: IProductData, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduct(product, index)}
                  key={index}
                >
                  {product.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProducts}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentProduct ? (
            <div>
              <h4>Product</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentProduct.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentProduct.description}
              </div>
              <div>
                <label>
                  <strong>Country:</strong>
                </label>{" "}
                {currentProduct.country}
              </div>
              <div>
                <label>
                  <strong>Category:</strong>
                </label>{" "}
                {currentProduct.category === 1 ? "China" : currentProduct.category === 2 ? "South Korea" : currentProduct.category === 3 ? "United States" : ""}
              </div>

              <Link
                to={"/product/" + currentProduct.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Product...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}