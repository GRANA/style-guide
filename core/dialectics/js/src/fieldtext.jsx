class FieldText extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			isFocus: false,
			isFilled: false,
			isError: props.isError
		};

		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.checkEmpty = this.checkEmpty.bind(this);
	}

	onBlur() {
		this.setState({isFocus: false});
	}

	onFocus() {
		this.setState({isFocus: true});
	}

	checkEmpty(evt) {
		var value = evt.target.value;

		if (value) {
			this.setState({isFilled: true});
		} else {
			this.setState({isFilled: false});
		}
    }

	render() {
		var classes = classNames([
			this.state.isFocus && 'is-focus',
			this.state.isFilled && 'is-filled',
			this.state.isError && 'is-error'
	    ]);

		return (
			<div className={'field-group ' + classNames(classes)}>
				<label htmlFor={this.props.name} className="field-label">{this.props.label}</label>
				<input type="text" id={this.props.name} onBlur={this.onBlur} onFocus={this.onFocus} onKeyUp={this.checkEmpty} onPaste={this.checkEmpty} className="field-text" name={this.props.name}/>
				{this.props.helper && (
			      <div className="field-helper">{this.props.helper}</div>
			    )}
			</div>
		);
	}
}
