import { add } from './utils'
import './index.css' //  没有使用  会被 tree-shaking 掉
function main() {
  console.log(add(1, 2))
}

export default main
