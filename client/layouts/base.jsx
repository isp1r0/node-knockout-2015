const React = require('react')

const Footer = require('../components/footer.jsx')
const Header = require('../components/header.jsx')
const Nav = require('../components/nav.jsx')

var bodyStyles = {
  backgroundColor: '#EFEFEF',
  margin: '0',
  padding: '0',
  width: '100%'
}

var pageStyles = {
  margin: '0 auto',
  width: '80%'
}

const Base = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel='stylesheet' type='text/css' href='/public/styles/main.css' />
        </head>
        <body style={bodyStyles}>
          <Header />
          <Nav />
          <div style={pageStyles}>
            {this.props.children}
          </div>
          <hr />
          <Footer />
        </body>
      </html>
    )
  }
})

module.exports = Base
