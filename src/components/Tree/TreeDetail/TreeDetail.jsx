import React, { useState, useEffect } from 'react'
import Tree from 'react-d3-tree'
import * as treeService from '../../../services/treeService'
import * as memberService from '../../../services/memberService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PopupCard from '../PopupCard/PopupCard'
import Swal from 'sweetalert2';

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
                    //نحط الجد في اول عقده ( رأس الشجره)
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
    <g>
        {/* 1. تعريف القناع الدائري للصورة */}
        <defs>
            <clipPath id={`circleClip-${nodeDatum.name}`}>
                <circle cx="0" cy="-15" r="25" />
            </clipPath>
        </defs>

        {/* 2. المنطقة القابلة للضغط لفتح وإغلاق الفروع */}
        <g onClick={toggleNode} style={{ cursor: 'pointer' }}>
            {nodeDatum.image ? (
                <>
                    {/* دائرة خلفية لتعطي إطاراً جميلاً */}
                    <circle r="27" fill="#2d5a27" cx="0" cy="-15" />
                    <image
                        href={nodeDatum.image}
                        x="-25"
                        y="-40"
                        width="50"
                        height="50"
                        clipPath={`url(#circleClip-${nodeDatum.name})`}
                        preserveAspectRatio="xMidYMid slice"
                    />
                </>
            ) : (
                /* إذا ما فيه صورة: أظهر الإيموجي في نص الدائرة */
                <text
                    x="0"
                    y="-5"
                    textAnchor="middle"
                    style={{ fontSize: '30px', pointerEvents: 'none', userSelect: 'none' }}
                >
                    👤
                </text>
            )}
            
            {/* علامة الزائد تظهر فقط عند وجود أبناء مخفيين */}
            {nodeDatum.children && nodeDatum.children.length > 0 && nodeDatum.__rd3t.collapsed && (
                <text x="22" y="-30" style={{ fontSize: '14px' }}>➕</text>
            )}
        </g>

        {/* 3. اسم العضو - يفتح البوب أب */}
        <text
            fill="#333"
            x="0"
            y="35"
            textAnchor="middle"
            style={{ fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
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
