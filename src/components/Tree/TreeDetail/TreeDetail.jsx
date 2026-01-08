import React, { useState, useEffect } from 'react'
import Tree from 'react-d3-tree'
import * as treeService from '../../../services/treeService'
import * as memberService from '../../../services/memberService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PopupCard from '../PopupCard/PopupCard'

const TreeDetail = ({ findTreeToUpdate, deleteTree }) => {
    const { treeId } = useParams()
    const navigate = useNavigate()


    const [selectedNodeData, setSelectedNodeData] = useState(null);

    const handleNodeClick = (nodeData, evt) => {
        // Set the state to show the pop-up with the clicked node's data
        setSelectedNodeData(nodeData);
    };

    const [tree, setTree] = useState(null)
    const [familyData, setFamilyData] = useState(null)
    const [code, setCode] = useState('');

    const formatDataForTree = (membersList, parentId = null) => {
        return membersList
            .filter(member => {
                const memberParentId =
                    member.parentId && typeof member.parentId === 'object'
                        ? member.parentId._id
                        : member.parentId;

                if (parentId === null) return !memberParentId;

                return String(memberParentId) === String(parentId);
            })
            .map(member => ({
                name: member.firstName,
                lastName: member.lastName,
                relation:member.relation,
                dateOfBirth:member.dateOfBirth,
                image:member.image,
                attributes: {
                    Relation: member.relation,
                    Generation: member.generation,
                },
                children: formatDataForTree(membersList, member._id),
            }));
    };


    useEffect(() => {
        const loadTreeData = async () => {
            try {
                const treeData = await treeService.show(treeId)
                setTree(treeData)

                const membersList = await memberService.index(treeId)
                const structuredMembers = formatDataForTree(membersList, null)

                if (structuredMembers.length > 0) {
                    setFamilyData({
                        name: `${treeData.lastName} Family`,
                        children: structuredMembers,
                    })
                } else {
                    setFamilyData(null);
                }
            } catch (error) {
                console.error("Error loading tree:", error)
            }
        }

        loadTreeData()
    }, [treeId])



    const handleDelete = async () => {
        if (!code) return console.log('Please enter the family code to delete this tree!');
        try {
            const deletedTree = await treeService.deleteOne(treeId, { code })
            if (deletedTree) {
                deleteTree(treeId)
                navigate('/trees')

            }
        }
        catch (error) { console.log(error) }

    }
    if (!tree) return <h1>Loading ...</h1>
    return (
        <div>

            {selectedNodeData && (
                <PopupCard
                    data={selectedNodeData}
                    onClose={() => setSelectedNodeData(null)}
                />
            )}

            <h2> Family Name : {tree.lastName}</h2>
            <div style={{ width: '100%', height: '600px', border: '1px solid #ccc', borderRadius: '8px', background: '#f9f9f9' }}>
                {familyData ?
                    (<Tree
                        data={familyData}
                        orientation="vertical"
                        pathFunc="step"
                        translate={{ x: 250, y: 50 }}
                        onNodeClick={handleNodeClick}
                    />
                    ) : (
                        <div>
                            <p>No members found.</p>
                            <Link to={`/trees/${treeId}/members/new`}>+ Add First Member</Link>
                        </div>
                    )}
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
                <Link onClick={() => { findTreeToUpdate(treeId); navigate(`/trees/${treeId}/edit`) }}>Edit</Link>
                <br />
                <button onClick={handleDelete}>Delete</button>
                <Link to={`/trees/${treeId}/members/new`}>Add New Member</Link>
            </div>
        </div>
    )
}

export default TreeDetail
