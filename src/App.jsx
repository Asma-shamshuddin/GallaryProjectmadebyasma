import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './component/card'

const App = () => {

  const [userdata, setUserData]=useState([]);
  const [index,setIndex]=useState(1)

  const getData =async () =>{
     const response =await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)

     setUserData(response.data)
     }

     useEffect(function(){
      getData()
     },[index])

  let printUserData = <h3 className='bg-gray-400 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>Loading...</h3>

  if(userdata.length>0){
    printUserData = userdata.map(function(elem,idx){

      return <div key={idx}>
       <Card   elem={elem}/>
      </div>
      
    })
  }

  return (
    <div className='bg-black h-screen overflow-auto p-4 text-white'> 
        <div className='flex h-[82%] flex-wrap gap-4 p-2'>
          { printUserData}
        </div>

         <div className='flex justify-center items-center gap-6 p-4'>
          <button onClick={()=>{
            if(index>1){
              setIndex(index-1)
              setUserData([])
            }
          }}
          style={{opacity: index == 1 ? 0.6 : 1 }}
          className='bg-amber-400 text-black rounded font-semibold cursur-pointer active:scale-95  px-4 py-2' >
            Prev
            </button>

            <h4>page{index}</h4>
          <button onClick={()=>{
            setIndex(index+1)
            setUserData([])
          }}
          className='bg-amber-400 text-black rounded font-semibold cursor-pointer active:scale-95 px-4 py-2'>
            Next
            </button>
        </div>

       
    
    </div>
  )
}

export default App
