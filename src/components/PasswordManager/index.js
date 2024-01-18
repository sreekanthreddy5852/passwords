// PasswordManager.js
import React, { Component } from 'react'
import './index.css'

class PasswordManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passwords: [],
      showPasswords: false,
      searchValue: '',
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleCheckboxChange = () => {
    this.setState((prevState) => ({ showPasswords: !prevState.showPasswords }))
  }

  handleAddPassword = (event) => {
    event.preventDefault()

    const { websiteInput, usernameInput, passwordInput } = this.state;

    if (!websiteInput || !usernameInput || !passwordInput) {
      alert('Please fill in all fields')
      return
    }

    this.setState((prevState) => ({
      passwords: [
        ...prevState.passwords,
        {
          website: websiteInput,
          username: usernameInput,
          password: passwordInput,
          id: Date.now(),
        },
      ],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  handleDeletePassword = (id) => {
    this.setState((prevState) => ({
      passwords: prevState.passwords.filter((password) => password.id !== id),
    }))
  }

  render() {
    const { passwords, showPasswords, searchValue } = this.state;
    const filteredPasswords = passwords.filter((password) =>
      password.website.toLowerCase().includes(searchValue.toLowerCase())
    )

    return (
      <div className="container">
        <h1>Add New Password</h1>
        <form onSubmit={this.handleAddPassword}>
          <input
            type="text"
            name="websiteInput"
            placeholder="Enter Website"
            value={this.state.websiteInput}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="usernameInput"
            placeholder="Enter Username"
            value={this.state.usernameInput}
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="passwordInput"
            placeholder="Enter Password"
            value={this.state.passwordInput}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>

        <h1>Your Passwords</h1>
        <p>{filteredPasswords.length}</p>

        <input
          type="search"
          value={searchValue}
          onChange={(e) => this.setState({ searchValue: e.target.value })}
        />

        <input
          type="checkbox"
          onChange={this.handleCheckboxChange}
          checked={showPasswords}
        />
        <label>Show passwords</label>

        {filteredPasswords.length > 0 ? (
          <ul>
            {filteredPasswords.map((password) => (
              <li key={password.id}>
                <p>{password.website}</p>
                <p>{password.username}</p>
                {showPasswords ? (
                  <p>{password.password}</p>
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                    alt="stars"
                  />
                )}
                <button
                  data-testid="delete"
                  onClick={() => this.handleDeletePassword(password.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <img
              alt="no passwords"
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            />
            <p>No Passwords</p>
          </div>
        )}
      </div>
    );
  }
}

export default PasswordManager;
