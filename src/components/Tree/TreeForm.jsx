import React, { useState } from 'react'
import * as treeService from '../../services/treeService'
import { useNavigate } from 'react-router'

const TreeForm = (props) => {
  const {updateTrees , treeToUpdate ,updateOneTree } = props
  const navigate =useNavigate()

  const [formState , setFormState] =useState(treeToUpdate ? treeToUpdate : {
    lastName:'',  code:'',numFamily:0
  })

  const handleSubmit=async (event)=>{
    event.preventDefault()
    console.log(formState)

    const payload = {...formState}
    payload.age=Number(payload.numFamily) 
    
    if (treeToUpdate) {
      const updateTree = await treeService.update(treeToUpdate._id, payload)
      

      if (updateTree) {
        updateOneTree(updateTree)
        navigate('/')
      }
      else {
        console.log('something went wrong')
      }
    }else {

      const newTreeCreated = await treeService.create(payload)//creating new pet

        if(newTreeCreated){

          updateTrees(newTreeCreated)
          navigate('/')

        }
        else{
          console.log('something went wrong')
        }
      }
      
    }
  
 
    
 
  const handleChange =(event)=>{
    const {lastName , value } = event.target 

    const newFormState ={...formState , lastName:value} 

    setFormState(newFormState)

  }
  //if you cant write the input in the so there is something wroong in the handle change
  return (
    <div>
      <h1>Tree form</h1>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="lastName"> Family Name:</label>
        <input type="text" name="lastName" id='lastName' value={formState.lastName} onChange={handleChange}/>
        
        <label htmlFor="numFamily"> No. of Family members:</label>
        <input type="number" name="numFamily" id='numFamily' min= {0} value={formState.numFamily} onChange={handleChange}/>
    
        <button type="submit">Save</button>

      </form>
    </div>
  )
}

export default TreeForm
