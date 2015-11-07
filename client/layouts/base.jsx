const React = require('react')

const Base = React.createClass({
  render: function () {

    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
          {this.props.children}
          <hr />
        </body>
      </html>
    )
  }
})

module.exports = Base
