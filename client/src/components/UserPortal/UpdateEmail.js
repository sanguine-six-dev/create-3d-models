import React, {Component} from 'react'

class UpdateEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            nameFieldError: '',
            emailFieldError: ''
        };
    };

    handleNameChange = event => {
        this.setState({
            name: event.target.value
        }, () => {
            this.nameValidation();
        })
    };

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        }, () => {
            this.nameValidation();
        })
    };

    nameValidation = () => {
        const name = this.state.name;
        this.setState({
                nameFieldError: name.length > 1 ? null :
                    'Name must be longer than 1 character'
            }
        )
    };

    emailValidation = () => {
        const email = this.state.email;
        this.setState({
            emailFieldError: email.length > 1 ? null : 'Email address must be longer than 3 characters'
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const {name, email} = this.state;
        alert(`name: ${name}\n email: ${email}`)
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input name="name"
                           className={`form-control ${this.state.nameFieldError ? 'is-invalid' : ''}`}
                           id="name" placeholder="Enter name"
                           value={this.state.name}
                           onChange={this.handleNameChange}
                           onBlur={this.nameValidation}
                    />
                    <div className='invalid-feedback'>{this.state.nameFieldError}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input name="email"

                           className={`form-control ${this.state.emailFieldError ? 'is-invalid' : ''}`}
                           id="email"
                           placeholder="Enter email"
                           value={this.state.email}
                           onChange={this.handleEmailChange}
                           onBlur={this.emailValidation}
                    />
                    <div className='invalid-feedback'>{this.state.emailFieldError}</div>
                </div>
                <button type="submit"
                        className="btn btn-success btn-block">Submit
                </button>
            </form>
        )

    }
}

export default UpdateEmail;
