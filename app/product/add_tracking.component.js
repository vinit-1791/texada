// import { DateTime } from 'react-datetime-bootstrap';

window.AddTrackingComponent = React.createClass({
    getInitialState: function() {
        $(document).ready(function(){
            $(".datetimepicker").datetimepicker({format:'YYYY-MM-DD HH:mm:SS'});
        });
        return {
            longitude: '',
            latitude: '',
            elevation: '',
            time: '',
            successCreation: null,
            responseMessage: null
        };
    },
     
    onLongitudeChange: function(e) {
        this.setState({longitude: e.target.value});
    },
     
    onLatitudeChange: function(e) {
        this.setState({latitude: e.target.value});
    },
     
    onElevationChange: function(e) {
        this.setState({elevation: e.target.value});
    },
     
    onTimeChange: function(e) {
        console.log(e.target.value);
        this.setState({time: e.target.value});
        console.log(this.state.time);
    },
    
    onSave: function(e){
        this.state.time = $(".datetimepicker").val();
        var form_data={
            product_id: this.props.productId,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            elevation: this.state.elevation,
            time: this.state.time
        };
     
        $.ajax({
            url: "http://localhost/texada/codeigniter/index.php/api/tracking/addTracking",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(response) {
                this.setState({successCreation: response['success']});
                this.setState({responseMessage: response['message']});
     
                this.setState({longitude: ""});
                this.setState({latitude: ""});
                this.setState({elevation: ""});
                this.setState({time: ""});
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
                onClick={() => this.props.changeAppMode('readOne', this.props.productId)}
                className='btn btn-info margin-bottom-1em m-r-1em'> Product Details
            </a>
            
            <form onSubmit={this.onSave}>
                <table className='table table-bordered table-hover'>
                <tbody>
                    <tr>
                        <td>Longitude</td>
                        <td>
                            <input
                            type='text'
                            className='form-control'
                            required
                            value={this.state.longitude}
                            onChange={this.onLongitudeChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>Latitude</td>
                        <td>
                            <input
                            type='text'
                            className='form-control'
                            required
                            value={this.state.latitude}
                            onChange={this.onLatitudeChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>Elevation</td>
                        <td>
                            <input
                            type='text'
                            className='form-control'
                            required
                            value={this.state.elevation}
                            onChange={this.onElevationChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>Time</td>
                        <td style={{position: 'relative'}}>
                            <input
                            type = 'text'
                            className = 'form-control datetimepicker'
                            required 
                            onChange={this.onTimeChange} />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button
                            className='btn btn-primary'
                            onClick={this.onSave}>Add Tracking Info</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
        );
    }
});