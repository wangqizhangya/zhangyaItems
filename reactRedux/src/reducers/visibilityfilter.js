const visibilityFilter=(state='SHOW_ALL',action)=>{
	switch(action.type){
		case 'SET_VISIBILITY':
			return action.visibilityFilter
		case 'TOGGLE_TODO':
			return Object.assign({},state,{
				completed:!state.complete
			})
		default:
			return state
	}
}