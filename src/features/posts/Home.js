import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import convertFormat from '../../function/Convert.js';

import { fetchAll } from './postsSlice.js';
import { useDispatch,useSelector } from 'react-redux';
/**
* @author
* @function Home
**/

const Home = (state) => {

  const dispatch = useDispatch()
  //const orderdPostIds = useSelector()

  const postStatus = useSelector((state) => state.post.status)

  //const [status,setStatus] = useState("idle")
  const error = useSelector((state) => state.post.error)
  let consta = useSelector((state) => state.post.Items)
  //console.log(postStatus)
  
  useEffect(() => {

    if (postStatus === "idle") {
      dispatch(fetchAll())
      console.log(1)
    }
  },[postStatus,dispatch])

  let content 

  if (postStatus === "loading") {
    content = "読み込み中"
  } else if (postStatus === "succeeded") {

    content = consta.data.map(article => 
    {
      return (
        <Card
              key={`ranking-item-${article.uuid }`}
              style={{ maxWidth: '500px', margin: '32px auto'}}
              src={`post/${article.uuid}`}
         >
           <NavLink key={article.uuid} to={`/post/${article.uuid}`}>
             <CardMedia
               image={article.image ? process.env.REACT_APP_END_POINT+article.image: 'http://design-ec.com/d/e_others_50/l_e_others_500.png'}
               title={article.title}
               style={{ height: '200px' }}
             />
             <CardContent>
               <Typography type="title" variant="h4">
                 {article.title}
               </Typography>
               <Typography className='right-placement' type="title" >
                 {convertFormat(article.created_at)}
               </Typography>
             </CardContent>
           </NavLink>
        </Card>
      )
    }
    )
    //console.log(content.map(data => data ))

  } else if (postStatus === "failed"){
    content = <div>{error}</div>
  }

  return(

     <div>
       {content},
      </div>
   )

 }

export default Home