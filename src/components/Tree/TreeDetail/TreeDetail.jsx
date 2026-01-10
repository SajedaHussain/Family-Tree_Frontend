import React, { useState, useEffect } from 'react'
import Tree from 'react-d3-tree'
import * as treeService from '../../../services/treeService'
import * as memberService from '../../../services/memberService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PopupCard from '../PopupCard/PopupCard'
import Swal from 'sweetalert2';
import "./TreeDetail.css";

const TreeDetail = ({ findTreeToUpdate, deleteTree }) => {
    const { treeId } = useParams()
    const navigate = useNavigate()


    const [selectedNodeData, setSelectedNodeData] = useState(null);

    const handleNodeClick = (nodeDatum) => {
        // Set the state to show the pop-up with the clicked node's data
        setSelectedNodeData(nodeDatum);
    };

    const [tree, setTree] = useState(null)
    const [familyData, setFamilyData] = useState(null)

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
                _id: member._id,
                lastName: member.lastName,
                relation: member.relation,
                dateOfBirth: member.dateOfBirth,
                image: member.image,
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
                    setFamilyData(structuredMembers[0])
                } else {
                    setFamilyData(null);
                }
            } catch (error) {
                console.error("Error loading tree:", error)
            }
        }

        loadTreeData()
    }, [treeId])

    const handleDelete = async (verifiedCode) => {
        try {
            const deletedTree = await treeService.deleteOne(treeId);
            if (deletedTree) {
                deleteTree(treeId)
                navigate('/trees')

            }
        }
        catch (error) { console.log(error) }
    }

    if (!tree) return <h1>Loading ...</h1>

    const renderCustomNode = ({ nodeDatum, toggleNode }) => (
           <g className="node-group">
            <rect className="node-rect" x="-70" y="-25" width="180" height="50" rx="8" />

            <rect className="node-sidebar" x="-70" y="-25" width="5" height="50" rx="2" />

            {/* اذا ضغطنا على الصوره تنفتح او تنغلق العقده*/}
            <g
                className="node-avatar-area"
                onClick={(event) => {
                    event.stopPropagation();
                    toggleNode();
                }}
            >
                 <image
                        href={nodeDatum.image || "https://i.postimg.cc/2qtsw-YGj/af.png"}
                        x="-58" y="-18"
                        width="40" height="40"
                        className="node-image"
                        preserveAspectRatio="xMidYMid slice"
                    />
        

                {/* +اذا في ابناء و العقده مغلقه*/}
                {nodeDatum.children && nodeDatum.children.length > 0 && nodeDatum.__rd3t.collapsed && (
                    <text x="-65" y="-15" className="collapse-indicator">＋</text>
                )}
            </g>

            {/*  الاسم اذا ضغطنا عليه تطلع معلومات الشخص) */}
            <text
                className="node-name-text"
                x="-15"
                y="5"
                textAnchor="start"
                onClick={(event) => {
                    event.stopPropagation();
                    handleNodeClick(nodeDatum);
                }}
            >
                {nodeDatum.name}
            </text>
        </g>
    );

    const handleProtectedAction = async (actionType) => {

        const { value: enteredCode } = await Swal.fire({
            title: 'Security Check',
            text: 'Please enter the Family Code to proceed',
            input: 'text',
            inputPlaceholder: 'Enter code here...',
            showCancelButton: true,
            confirmButtonColor: '#2d5a27',
            confirmButtonText: 'Verify',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to enter the code!';
                }
            }
        });


        if (!enteredCode) return;

        if (enteredCode === tree.code) {
            if (actionType === 'edit') {
                findTreeToUpdate(treeId);
                navigate(`/trees/${treeId}/edit`);
            } else if (actionType === 'add') {
                navigate(`/trees/${treeId}/members/new`);
            } else if (actionType === 'delete') {
                handleDelete(enteredCode);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Access Denied',
                text: 'The code you entered is incorrect.',
                confirmButtonColor: '#ff4d4d'
            });
        }
    };

    return (
        <div>

            {selectedNodeData && (
                <PopupCard
                    data={selectedNodeData}
                    onClose={() => setSelectedNodeData(null)}
                    treeCode={tree.code}
                    onEdit={() => {
                        const memberId = selectedNodeData._id;
                        navigate(`/trees/${treeId}/members/${memberId}/edit`)
                    }}
                    onDelete={async (verifiedCode) => {

                        try {
                            const memberId = selectedNodeData._id;
                            await memberService.deleteOne(memberId, { code: verifiedCode });

                            setSelectedNodeData(null);
                            const updatedMembers = await memberService.index(treeId);
                            const structured = formatDataForTree(updatedMembers, null);
                            setFamilyData(structured.length > 0 ? structured[0] : null);

                            Swal.fire('Deleted!', 'Member has been removed.', 'success');
                        } catch (error) {
                            console.error("Error deleting member:", error);
                            Swal.fire('Error', 'Could not delete member', 'error');
                        }
                    }}
                />
            )}

            <h2> Family Name : {tree.lastName}</h2>
            <div className="tree-container">
                {familyData ?
                    (<Tree
                        data={familyData}
                        orientation="vertical"
                        pathFunc="diagonal"
                        translate={{ x: 700, y: 50 }}
                        nodeSize={{ x: 120, y: 120 }}
                        separation={{ siblings: 1.5, nonSiblings: 2 }}
                        renderCustomNodeElement={(rd3tProps) => renderCustomNode(rd3tProps)}
                    />
                    ) : (
                        <div className='button-no'>
                            <p>No members found.</p>
                            <button onClick={() => handleProtectedAction('add')}>+ Add First Member</button>
                        </div>
                    )}
            </div>

            <div>
                <div className="action-buttons">
                    <button onClick={() => handleProtectedAction('add')}>➕ Add Member</button>
                    <button onClick={() => handleProtectedAction('edit')}>✏️ Edit Tree</button>
                    <button className="delete-btn" onClick={() => handleProtectedAction('delete')}>🗑️ Delete Tree</button>
                </div>

            </div>
        </div>
    )
}

export default TreeDetail
