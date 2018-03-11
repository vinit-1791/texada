// component that contains the logic to update a product
window.UpdateProductComponent = React.createClass({
    getInitialState: function() {
        return {
            id: 0,
            description: '',
            is_active: '',
            successUpdate: null,
            responseMessage: null
        };
    },
     
    // on mount, fetch all categories and one product data to stored them as this component's state
    componentDidMount: function(){
        var productId = this.props.productId;
        this.serverRequestProd = $.get("http://localhost/texada/codeigniter/index.php/api/products/product/id/" + productId,
            function (product) {
                this.setState({id: product.product_ID});
                this.setState({description: product.product_description});
                this.setState({is_active: product.is_active});
            }.bind(this));
        $('.page-header h1').text('Update product');
    },
     
    componentWillUnmount: function() {
        this.serverRequestProd.abort();
    },
     
    onDescriptionChange: function(e){
        this.setState({description: e.target.value});
    },
     
    onActiveChange: function(e){
        this.setState({is_active: e.target.value});
    },
    
    onSave: function(e){
        var form_data={
            id: this.state.id,
            product_description: this.state.description,
            is_active: this.state.is_active
        };
        
        $.ajax({
            url: "http://localhost/texada/codeigniter/index.php/api/products/updateProduct",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(response) {
                this.setState({successUpdate: response['success']});
                this.setState({responseMessage: response['message']});
            }.bind(this),
            error: function(xhr, resp, text){
                console.log(xhr, resp, text);
            }
        });
        e.preventDefault();
    },
    render: function() {
        return (
            <div>
                {
                    this.state.successUpdate == true ?
                        <div className='alert alert-success'>
                            {this.state.responseMessage}
                        </div>
                    : null
                }
                {
                    this.state.successUpdate == false ?
                        <div className='alert alert-danger'>
                            {this.state.responseMessage}
                        </div>
                    : null
                }
                <a href='#'
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    Products List
                </a>
                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                            <tr>
                                <td>Description</td>
                                <td>
                                    <textarea
                                        type='text'
                                        className='form-control'
                                        required
                                        value={this.state.description}
                                        onChange={this.onDescriptionChange}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>Active</td>
                                <td>
                                    <select onChange={this.onActiveChange}  value={this.state.is_active}>
                                        <option value='1'>Yes</option>
                                        <option value='0'>No</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button
                                        className='btn btn-primary'
                                        onClick={this.onSave}>Save Changes</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});