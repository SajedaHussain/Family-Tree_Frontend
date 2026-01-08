import React, { useState, useEffect } from 'react'
import Tree from 'react-d3-tree'
import * as treeService from '../../../services/treeService'
import * as memberService from '../../../services/memberService'
import { Link, useNavigate, useParams } from 'react-router-dom'

const TreeDetail = ({ findTreeToUpdate, deleteTrees }) => {
    const { treeId } = useParams()
    const navigate = useNavigate()

    const [tree, setTree] = useState(null)
    const [familyData, setFamilyData] = useState(null)
     const [code, setCode] = useState('');

    const formatDataForTree = (membersList, parentId = null) => {
        return membersList
            .filter(member => {
                const parent = member.parentId?._id || member.parentId
                return parent === parentId
            })
            .map(member => ({
                name: member.firstName,
                attributes: {
                    Relation: member.relation,
                    Generation: member.generation,
                },
                children: formatDataForTree(membersList, member._id),
            }))
    }


    useEffect(() => {
        const loadTreeData = async () => {
            try {
                const treeData = await treeService.show(treeId)
                setTree(treeData)

                const membersList = await memberService.index(treeId)
                const structuredMembers = formatDataForTree(membersList)

                if (structuredMembers.length > 0) {
                    setFamilyData({
                        name: `${treeData.lastName} Family`,
                        children: structuredMembers,
                    })
                }
            } catch (error) {
                console.error("Error loading tree:", error)
            }
        }

        loadTreeData()
    }, [treeId])


    const handleDelete = async () => {
        if (!code) return console.log('Please enter the family code to delete this tree!');
        try{
        const deletedTree = await treeService.deleteOne(treeId, { code })
         if (deletedTree){
            deleteTrees(treeId)
            navigate('/trees')

         }}
         catch(error){ console.log(error)}

    }
    if (!tree) return <h1>Loading ...</h1> 
    return (
        <div>
            <h2> Family Name : {tree.lastName}</h2>
            <div style={{ width: '100%', height: '600px', border: '1px solid #ccc', borderRadius: '8px', background: '#f9f9f9' }}>
                {familyData ? 
                      (<Tree  
                        data={familyData}
                        orientation="vertical" 
                        pathFunc="step"/>
                    ) 
                      : (<p>No members found.</p>)}
            </div>

            <label htmlFor="code">Enter Family Code:</label>
            <input
                type="text"
                id="code"
                value={code}
                onChange={evt => setCode(evt.target.value)}
                placeholder="Family code required"
            />
           
            <div>
                <Link onClick={() => findTreeToUpdate(treeId)} to={`/trees/${treeId}/edit`}>Edit</Link>
                <br />
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default TreeDetail
