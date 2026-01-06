import React from 'react'
import { useState, useEffect } from 'react'
import * as treeService from '../../services/treeService'
import { Link, useNavigate, useParams } from 'react-router'

const TreeDetail = ({ findTreeToUpdate , deleteTrees}) => {
    const [tree, setTree] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        const getOneTree = async (id) => {
            const tree = await treeService.show(id)
            setTree(tree) 
        }
        if (id) getOneTree(id)

    }, [id])

    const handleDelete = async () => {
        const deletedTree = await treeService.deleteOne(id)
         if (deletedTree){
            deleteTrees(id)
            navigate('/')

         }
         else{ console.log('Failed')}

    }
    if (!id) return <h1>Loading ...</h1>
    if (!tree) return <h1>Loading ...</h1> 
    return (
        <div>
            <h2> Family Name : {tree.lastName}</h2>
            <h2> No. of Family members : {tree.numFamily}</h2>

            <div>
                <Link onClick={() => findTreeToUpdate(id)} to={`/trees/${id}/update`}>Edit</Link>
                <br />
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default TreeDetail
