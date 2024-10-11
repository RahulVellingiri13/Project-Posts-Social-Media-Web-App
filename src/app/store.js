import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../app/features/counter/counterSlice'\
import postsReducer from '../app/features/posts/postsSlice'
import usersReducer from '../app/features/users/usersSlice'


export const store = configureStore({
    reducer:{
        // counter : counterReducer,
       posts: postsReducer,
       users: usersReducer,
    }
})

