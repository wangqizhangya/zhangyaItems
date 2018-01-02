import { layer } from './components/layer/layer.js'
import './css/common.css'
const App=function(){
	var dom=document.getElementById('app')
	var layer2=new layer();
	console.log(layer2.tpl)
	dom.innerHTML=layer2.tpl;
}
new App();
