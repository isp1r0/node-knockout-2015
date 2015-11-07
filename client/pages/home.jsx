const React = require('react')
const Layout = require('../layouts/base.jsx')

const Home = React.createClass({
  render: function () {
    return (
      <Layout title="Home Page">
        <h1>Welcome to the plot device.</h1>
      </Layout>
    )
  }
})

module.exports = Home
