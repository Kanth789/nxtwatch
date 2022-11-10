import { ThreeDots } from  'react-loader-spinner'

import {LoaderEl} from './styledComponents'

const LoaderComp = () => (
  <LoaderEl>
   <ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />
  </LoaderEl>
)

export default LoaderComp
