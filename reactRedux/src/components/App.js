
import React,{ Component } from 'react';
import 'babel-polyfill';
import { Commen } from './Counter.js'
import { Testall } from './Test.js'
import { Skipall } from './Skip.js'
import { TemperatureContainer } from'./ParentAndChild'
class App extends Component{
	constructor(props){
		super(props);
		
	}
	
	render() {
	console.log(this.props)	
    return (
    <div>
    
     	<Commen />
     	<Testall />
     	<Skipall />
     	<TemperatureContainer />
     	{this.props.children}
    </div>
   )
  }
}
export { App };