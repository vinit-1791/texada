window.CreateProductComponent = React.createClass({
    // initialize values
    getInitialState: function() {
        return {
            description: '',
            successCreation: null,
            responseMessage: null
        };
    },
     
    onDescriptionChange: function(e) {
        this.setState({description: e.target.value});
    },
     
    // handle save button clicked
    onSave: function(e){
        var form_data={
            product_description: this.state.description
        };
     
        $.ajax({
            url: "http://localhost/texada/codeigniter/index.php/api/products/addProduct",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(response) {
                this.setState({successCreation: response['success']});
                this.setState({responseMessage: response['message']});
     
                this.setState({description: ""});
            }.bind(this),
            error: function(xhr, resp, text){
                console.log(xhr, resp, text);
            }
        });
        e.preventDefault();
    },
     
    render: function() {
        /*
        - tell the user if a product was created
        - tell the user if unable to create product
        - button to go back to products list
        - form to create a product
        */
        return (
        <div>
            {
                this.state.successCreation == true ?
                    <div className='alert alert-success'>
                        {this.state.responseMessage}
                    </div>
                : null
            }
            {
                this.state.successCreation == false ?
                    <div className='alert alert-danger'>
                        {this.state.responseMessage}
                    </div>
                : null
            }
     
            <a href='#'
                onClick={() => this.props.changeAppMode('read')}
                className='btn btn-primary margin-bottom-1em'> Products List
            </a>
            
            <form onSubmit={this.onSave}>
                <table className='table table-bordered table-hover'>
                <tbody>
                    <tr>
                        <td>Description</td>
                        <td>
                            <input
                            type='text'
                            className='form-control'
                            required
                            value={this.state.description}
                            onChange={this.onDescriptionChange} />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button
                            className='btn btn-primary'
                            onClick={this.onSave}>Save</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
        );
    }
});