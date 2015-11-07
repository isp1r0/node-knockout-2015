const React = require('react')

var headerStyles = {
  backgroundColor: 'red',
  display: 'inline-block',
  fontFamily: 'Oswald, sans-serif',
  fontSize: '42',
  fontWeight: '700',
}

var h1Styles = {
  margin: '0',
  padding: '0',
  textTransform: 'uppercase'
}

var aStyles = {
  color: 'white',
  textDecoration: 'none'
}

const Header = React.createClass({
  render: function () {
    return (
      <header style={headerStyles}>
        <h1 style={h1Styles}>
          <a style={aStyles} href='/'>Revisit</a>
        </h1>
      </header>
    )
  }
})

module.exports = Header
