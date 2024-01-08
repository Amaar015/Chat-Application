import { createSlice } from "@reduxjs/toolkit";


import { dispatch } from "../store";

const initialState={
    sidebar:{
        open:false,
        type:"Contact",
    }
}

const slice=createSlice({
    name:'app',
    initialState,
    reducers:{
        // toggle sidebar
        toggleSidebar(state,action) {
          state.sidebar.open=!state.sidebar.open;
          },
          updateSidebarType(state, action) {
            state.sidebar.type = action.payload.type;
          },
    }
})

export default slice.reducer;

export function ToggleSideBar(){
    return async ()=>{
        dispatch(slice.actions.toggleSidebar());
    }
}

export function UpdateSideBarType(type){
      return async()=>{
        dispatch(slice.actions.updateSidebarType({type}));
      }
}