const React = require('react')

const Footer = require('../components/footer.jsx')
const Header = require('../components/header.jsx')
const Nav = require('../components/nav.jsx')

const Base = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
          <Header />
          <Nav />
          <div className='page'>
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
