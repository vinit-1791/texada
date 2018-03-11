// component that contains the logic to read one product
window.TrackProductComponent = React.createClass({
    getInitialState: function() {
        // Get this product fields from the data attributes we set on the
        // #content div, using jQuery
        return {
            id: 0,
            description: '',
            tracking_info: []
        };
    },
     
    // on mount, read product data and them as this component's state
    componentDidMount: function(){
     
        var productId = this.props.productId;
     
        this.serverRequestProd = $.get("http://localhost/texada/codeigniter/index.php/api/tracking/getProductTracking/id/" + productId,
            function (product) {
                
                this.setState({id: product.product_ID});
                this.setState({description: product.product_description});
                this.setState({tracking_info: product.tracking});
            }.bind(this));
     
        $('.page-header h1').text('Read Product');
    },
     
    // on unmount, kill categories fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequestProd.abort();
    },
     
   render: function() {     
        return (
            <div>
                <a href='#'
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary m-r-1em margin-bottom-1em'>
                    All Products
                </a>
                <a href='#'
                    onClick={() => this.props.changeAppMode('addTracking')}
                    className='btn btn-primary margin-bottom-1em'>
                    Add Tracking Info
                </a>
     
                <table className='table table-bordered table-hover'>
                    <tbody>
                    <tr>
                        <td>Description</td>
                        <td>{this.state.description}</td>
                    </tr>
                    </tbody>
                </table>
                <TrackingTable
                    tackingInfo={this.state.tracking_info} />
            </div>
            
        );
    }
});