// component that renders a single product
window.ProductTrackingRow = React.createClass({
    render: function() {
    return (
        <tr>
            <td>{this.props.productTrack.tracking_ID}</td>
            <td>{this.props.productTrack.longitude}</td>
            <td>{this.props.productTrack.latitude}</td>
            <td>{this.props.productTrack.elevation}</td>
            <td>{this.props.productTrack.time}</td>
        </tr>
        );
    }
});