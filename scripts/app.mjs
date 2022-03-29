// needs to be a mudule in orde to import
import {flip as filipper , up} from './utils.mjs';

function hello(nm){
  let  name = up(filipper(nm))
  console.log(`hallo ${name}`)
}
hello('Yasser')