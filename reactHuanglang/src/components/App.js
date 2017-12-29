
import React,{ Component } from 'react';


import '../assets/css/app.css'

class App extends Component{
	constructor(props){
		super(props);
		this.state={
		  
		        
	    };
		
	}
	componendDidUnMount(){
		
	}
	componendWillUnMount(){
		
	}
	render() {
	
	    return (
		    <div>
		    	
		    	
		    		{React.cloneElement(this.props.children,this.state)}
		    </div>
	   	)
  	}
}

export { App };