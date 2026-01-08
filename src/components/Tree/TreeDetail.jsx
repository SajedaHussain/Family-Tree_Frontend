import React, { useState, useEffect } from 'react'
import Tree from 'react-d3-tree'
import * as treeService from '../../services/treeService'
import * as memberService from '../../services/memberService'
import { Link, useNavigate, useParams } from 'react-router-dom'

const TreeDetail = ({ findTreeToUpdate, deleteTrees }) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [tree, setTree] = useState(null)
    const [familyData, setFamilyData] = useState(null)

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
                const treeData = await treeService.show(id)
                setTree(treeData)

                const membersList = await memberService.index(id)
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
    }, [id])


    const handleDelete = async () => {
        const deleted = await treeService.deleteOne(id)
        if (deleted) {
            deleteTrees(id)
            navigate('/')
        }
    }

    if (!tree) return <h1>Loading...</h1>

    return (
        <div>
            <h2>Family Name: {tree.lastName}</h2>

            <div style={{ width: '100%', height: '500px' }}>
                {familyData ? (
                    <Tree data={familyData} orientation="vertical" pathFunc="step" />
                ) : (
                    <p>No members found</p>
                )}
            </div>

            <Link onClick={() => findTreeToUpdate(id)} to={`/trees/${id}/update`}>
                Edit Tree
            </Link>
            <br />
            <button onClick={handleDelete}>Delete Tree</button>
        </div>
    )
}

export default TreeDetail
