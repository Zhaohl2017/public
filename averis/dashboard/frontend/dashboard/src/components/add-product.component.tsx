import { Component, ChangeEvent } from "react";
import ProductDataService from "../services/product.service";
import IProductData from '../types/product.type';

type Props = {};

type State = IProductData & {
  submitted: boolean
};

export default class AddProduct extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "",
      country: "",
      category: null,
      submitted: false
    };
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeCountry(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      country: e.target.value
    });
  }

  onChangeCategory(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      category: e.target.value
    });
  }

  saveProduct() {
    const data: IProductData = {
      name: this.state.name,
      description: this.state.description,
      country: this.state.country,
      category: this.state.category
    };

    ProductDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          country: response.data.country,
          category: response.data.category,
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newProduct() {
    this.setState({
      id: null,
      name: "",
      description: "",
      country: "",
      category: null,
      submitted: false
    });
  }

  render() {
    const { submitted, name, description, country, category } = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProduct}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                required
                value={country}
                onChange={this.onChangeCountry}
                name="country"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                required
                value={category}
                onChange={this.onChangeCategory}
                name="category"
              />
            </div>

            <button onClick={this.saveProduct} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}