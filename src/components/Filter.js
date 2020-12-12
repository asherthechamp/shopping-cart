import { connect } from "react-redux";
import React, { Component } from "react";
import { filteredProducts, sortProducts } from "../actions/productActions";
class Filter extends Component {
  render() {
    return !this.props.filteredProducts ? (
      <div>Loading ...</div>
    ) : (
      <div className="filter" value={this.props.sort}>
        <div className="filter-result">{this.props.count} Products</div>
        <div className="filter-sort">
          Order{" "}
          <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProducts(this.props.products, e.target.value)
            }
          >
            <option value="latest">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="filter-size">
          Filter
          <select
            value={this.props.size}
            onChange={(e) =>
              this.props.filteredProducts(this.props.products, e.target.value)
            }
          >
            <option value="">All</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filteredProducts,
    sortProducts,
  }
)(Filter);
