class Checkbox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isChecked: this.props.isChecked,
		};

		this.toggleChange = this.toggleChange.bind(this);
	}

	toggleChange() {
		this.setState({
			isChecked: !this.state.isChecked,
		});
	}

	render() {
		return (
			<div className="field-group">
				<input type="checkbox" id={this.props.name} name={this.props.name} onChange={this.toggleChange} className="checkbox" checked={this.state.isChecked}/>
				<label htmlFor={this.props.name} className="checkbox-label"><span className="checkbox-label-box"></span></label>
			</div>
		);
	}
}
