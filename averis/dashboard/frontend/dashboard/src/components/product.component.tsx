import { Component, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import ProductDataService from "../services/product.service";
import IProductData from "../types/product.type";

type Props = {};

type State = {
  currentProduct: IProductData;
  message: string;
}

export default class Product extends Component<Props, State> {
  params: any = useParams() as any;
  navigate: any = useNavigate() as any;

  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      currentProduct: {
        id: null,
        name: "",
        description: "",
        country: "",
        category: null
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getProduct(this.params.id);
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          name: name,
        },
      };
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentProduct: {
        ...prevState.currentProduct,
        description: description,
      },
    }));
  }

  onChangeCountry(e: ChangeEvent<HTMLInputElement>) {
    const country = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          country: country,
        },
      };
    });
  }

  onChangeCategory(e: ChangeEvent<HTMLInputElement>) {
    const category = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          category: category,
        },
      };
    });
  }

  getProduct(id: string) {
    ProductDataService.get(id)
      .then((response: any) => {
        this.setState({
          currentProduct: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  updateProduct() {
    ProductDataService.update(
      this.state.currentProduct,
      this.state.currentProduct.id
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({
          message: "The product was updated successfully!",
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  deleteProduct() {
    ProductDataService.delete(this.state.currentProduct.id)
      .then((response: any) => {
        console.log(response.data);
        this.navigate("/product");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { currentProduct } = this.state;

    return (
      <div>
        {currentProduct ? (
          <div className="edit-form">
            <h4>Product</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentProduct.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentProduct.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  value={currentProduct.country}
                  onChange={this.onChangeCountry}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  value={currentProduct.category}
                  onChange={this.onChangeCategory}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProduct}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProduct}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    );
  }
}