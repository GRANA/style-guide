class FieldText extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			isFocus: false,
			isFilled: false,
			isError: props.isError,
			chars: 0
		};

		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.checkEmpty = this.checkEmpty.bind(this);
		this.renderType = this.renderType.bind(this);
		this.renderCharCount = this.renderCharCount.bind(this);
		this.runChecks = this.runChecks.bind(this);
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

    setCharacterCount(evt) {
    	var target = evt.target;
		var value = target.value;

		this.setState({chars: value.length});
    }

    runChecks(evt) {
    	this.checkEmpty(evt);
    	this.setCharacterCount(evt);
    }

    renderType() {
    	if (this.props.type === 'textarea') {
    		return (
    			<textarea onBlur={this.onBlur} 
    					  onFocus={this.onFocus} 
    					  onKeyUp={this.runChecks} 
    					  onPaste={this.runChecks} 
    					  className="field-text field-textarea" 
    					  name={this.props.name} 
    					  maxLength="200"></textarea>
    		);
    	} else {
    		return (
    			<input type="text" 
    				   id={this.props.name} 
    				   onBlur={this.onBlur} 
    				   onFocus={this.onFocus} 
    				   onKeyUp={this.runChecks} 
    				   onPaste={this.runChecks} 
    				   className="field-text" 
    				   name={this.props.name}/>
    		);
    	}
    }

    renderCharCount() {
    	if (this.props.type === 'textarea') {
    		return (
    			<div className="field-textarea-count">{this.state.chars + '/200'}</div>
    		);
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
				{this.renderType()}
				{this.renderCharCount()}
				{this.props.helper && (
			      <div className="field-helper">{this.props.helper}</div>
			    )}
			</div>
		);
	}
}
