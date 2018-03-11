// component for the whole products table
window.TrackingTable = React.createClass({
    render: function() {
    console.log(this.props.tackingInfo);
    var trackingRows = this.props.tackingInfo
        .map(function(productTrack, i) {
            return (
                <ProductTrackingRow
                    key={i}
                    productTrack = {productTrack} />
            );
        }.bind(this));
 
        return(
            !trackingRows.length
                ? <div className='alert alert-danger'>No tracking information found.</div>
                :
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>Tracking ID</th>
                            <th>Longitude</th>
                            <th>latitude</th>
                            <th>Elevation</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trackingRows}
                    </tbody>
                </table>
        );
    }
});