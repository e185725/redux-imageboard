import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

/**
* @author
* @function Header
**/

const Header = (props) => {
  return(
      <AppBar position="static">
          <Toolbar>
              <Link to="/">
                <Typography variant="h4" type="title" color="inherit" >
                    Blog
                </Typography>
              </Link>
              <div style={{marginLeft: 'auto'}}>
                  <Link to="/new">
                    <Button color="inherit">新規作成</Button>
                  </Link>
              </div>
          </Toolbar>
      </AppBar>
   )

 }

export default Header
