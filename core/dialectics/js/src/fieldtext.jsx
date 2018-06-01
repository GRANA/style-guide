class FieldText extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			isFocus: false
		};

		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}

	onBlur() {
		this.setState({isFocus: false});
	}

	onFocus() {
		this.setState({isFocus: true});
	}

	render() {
		var classes = classNames([
			this.state.isFocus && 'is-focus'
	    ]);

		return (
			<div className={'field-group ' + classNames(classes)}>
				<label htmlFor={this.props.name} className="field-label">{this.props.label}</label>
				<input type="text" id={this.props.name} onBlur={this.onBlur} onFocus={this.onFocus} className="field-text" name={this.props.name}/>
				<div className="field-helper">hint and helper text</div>
			</div>
		);
	}
}
