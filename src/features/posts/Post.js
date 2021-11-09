import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import convertFormat from '../../function/Convert.js'

import { postDeleted } from './postsSlice.js';
import { useDispatch,useSelector } from 'react-redux';
import { useLocation,useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { deleteUuidClear } from './postsSlice.js';
/**
* @author
* @function Post
**/

const Post = () => {
    const [articleList, setArticle] = useState([]);
    const dispatch = useDispatch()
    //let location = useLocation()
    let uuid = useParams()
    //uuid = uuid.postId
    const navigate = useNavigate()
    const postStatus = useSelector((state) => state.post.status)
    const error = useSelector((state) => state.post.error)
    const deleteuuid = useSelector((state) => state.post.deleteUuid)
    
    const deleteArticle = async(e) => {
        
        e.preventDefault(); 
        await dispatch(
            postDeleted(
            uuid.postId
        ))

        console.log(deleteuuid)
        
            navigate('/')
            dispatch(deleteUuidClear())
        

    }

    console.log(uuid.postId)
    useEffect(() => {
        console.log(`${process.env.REACT_APP_END_POINT}/api/articles/${uuid.postId}/`)
        axios
        .get(`${process.env.REACT_APP_END_POINT}/api/articles/${uuid.postId}/`)
            .then(res => {
                const articleList = res.data[0];
                setArticle(articleList);
            })
            .catch(err => {
                console.log(err);
        });
    }, [uuid]);




  return(
    <div>
        <Card
             key={`ranking-item-${articleList.uuid }`}
             style={{ maxWidth: '1000px', margin: '32px auto'}}
             src={`post/${articleList.uuid}`}
        >
            { articleList.image && 
          <CardMedia
            image={process.env.REACT_APP_END_POINT+articleList.image}
            title={articleList.title}
            style={{ height: '400px' }}
          />
            }
          <CardContent style={{ textAlign: 'left' }}>
            <Typography variant="h3" type="title" style={{margin:'0 0 20px 0'}}>
              {articleList.title}
            </Typography>

            <Typography className='right-placement' type="title" >
              {convertFormat(articleList.created_at)}
            </Typography>

            <Typography variant="h5" type="title" style={{margin:'0 0 20px 0'}}>
              {articleList.body}
            </Typography>

            <div className="right-placement">
            <Button onClick={deleteArticle} variant="contained" color="secondary" size="small">
              <DeleteIcon />
                削除
            </Button>
            </div>
          </CardContent>
        </Card>    
    </div>
   )
 }

export default Post