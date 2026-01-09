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
            const deletedTree = await treeService.deleteOne(treeId, { code: verifiedCode });
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
            {/* 1. الحاوية المستطيلة الرئيسية */}
            <rect className="node-rect" x="-70" y="-25" width="140" height="50" rx="8" />

            {/* خط جانبي جمالي */}
            <rect className="node-sidebar" x="-70" y="-25" width="5" height="50" rx="2" />

            {/* 2. منطقة الصورة / الإيموجي (تفتح وتغلق العقده) */}
            <g
                className="node-avatar-area"
                onClick={(e) => {
                    e.stopPropagation();
                    toggleNode();
                }}
            >
                {nodeDatum.image ? (
                    <image
                        href={nodeDatum.image}
                        x="-58" y="-18"
                        width="36" height="36"
                        className="node-image"
                        preserveAspectRatio="xMidYMid slice"
                    />
                ) : (
                    /* الإيموجي الافتراضي إذا لم توجد صورة */
                    <text x="-40" y="10" className="node-default-emoji">
                        {nodeDatum.children && nodeDatum.children.length > 0 ? '🌳' : '👤'}
                    </text>
                )}

                {/* مؤشر صغير إذا كانت العقدة مغلقة وبها أبناء */}
                {nodeDatum.children && nodeDatum.children.length > 0 && nodeDatum.__rd3t.collapsed && (
                    <text x="-65" y="-15" className="collapse-indicator">＋</text>
                )}
            </g>

            {/* 3. منطقة الاسم (تفتح بوب الديتيل) */}
            <text
                className="node-name-text"
                x="-15"
                y="5"
                textAnchor="start"
                onClick={(e) => {
                    e.stopPropagation();
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
                        <div>
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
