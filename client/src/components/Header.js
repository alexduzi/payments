import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

class Header extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' as={ Link } to="/" active={activeItem === 'home'} onClick={this.handleItemClick}>
            Home
          </Menu.Item>
          <Menu.Item name='newclient' as={ Link } to="/newclient" active={activeItem === 'newclient'} onClick={this.handleItemClick}>
            New Client
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default (Header);
