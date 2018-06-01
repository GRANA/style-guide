class FieldText extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			focus: "" 
		};

		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}

	onBlur() {
		this.setState({
			focus: ""
		});
	}

	onFocus() {
		this.setState({
			focus: "is-focus"
		});
	}

	render() {
		return (
			<div className={'field-group ' + this.state.focus}>
				<label htmlFor={this.props.name} className="field-label">{this.props.label}</label>
				<input type="text" id={this.props.name} onBlur={this.onBlur} onFocus={this.onFocus} className="field-text" name={this.props.name}/>
				<div className="field-helper">hint and helper text</div>
			</div>
		);
	}
}
