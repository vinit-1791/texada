// component that renders a single product
window.ProductRow = React.createClass({
    render: function() {
    return (
        <tr>
            <td>{this.props.product.product_ID}</td>
            <td>{this.props.product.product_description}</td>
            <td>
                <a href='#'
                    onClick={() => this.props.changeAppMode('readOne', this.props.product.product_ID)}
                    className='btn btn-info m-r-1em'> View Tracking
                </a>
                <a href='#'
                    onClick={() => this.props.changeAppMode('update', this.props.product.product_ID)}
                    className='btn btn-primary m-r-1em'> Edit
                </a>
                <a
                    onClick={() => this.props.changeAppMode('delete', this.props.product.product_ID)}
                    className='btn btn-danger'> Delete
                </a>
            </td>
        </tr>
        );
    }
});