import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = 
  {status:"idle",
   error: null,
   Items:[],
  }



const addArticle = (title, body, image) => {
  let form_data = new FormData();
  if(image){
    form_data.append('image', image, image.name);
  }
  form_data.append('title', title);
  form_data.append('body', body);
  axios.post(`${process.env.REACT_APP_END_POINT}/api/articles/`, form_data,{headers: {
          'content-type': 'multipart/form-data'
      }
  }).then(res => {
      //window.location.href="/";
  }).catch(err => {
      console.log(err);
  });
}


export const fetchAll = createAsyncThunk(
  "posts/fetchAll",
  async () => {
    const data = await axios.get(`${process.env.REACT_APP_END_POINT}/api/articles/`)
    return {data:data}
  }
)

export const postAdded2 = createAsyncThunk(
  "posts/Added",
  async (initialPost) => {
    console.log(initialPost)
    const title = initialPost.title
    const body = initialPost.body
    const image = initialPost.image
    await addArticle(title,body,image)
    return 
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {

      state.status = "idle"
      //state.posts.push(action.payload)
    },
  },
  extraReducers:(builder) => {
    builder
    .addCase(fetchAll.pending,(state,action) => {
      state.status = "loading"
    })
    .addCase(fetchAll.fulfilled,(state,action) => {
      state.status = "succeeded"
      state.Items = action.payload.data;
    })
    .addCase(fetchAll.rejected,(state,action) =>{
      state.status = "failed"
      state.error = action.error.message
    })
    .addCase(postAdded2.fulfilled,(state,action) =>{
      state.status = "idle"
      console.log(state.status)
    })
    
  },
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer