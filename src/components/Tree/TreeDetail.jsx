import React from 'react'
import Tree from 'react-d3-tree'
import { useState, useEffect } from 'react'
import * as treeService from '../../services/treeService'
import * as memberService from '../../services/memberService'
import { Link, useNavigate, useParams } from 'react-router'

const TreeDetail = ({ findTreeToUpdate , deleteTrees }) => {
    const [tree, setTree] = useState(null)
    const { id } = useParams()
    const [familyData, setFamilyData] = useState(null); // تخزين المعلومات على شكل شجره
    const navigate = useNavigate()
    //داله لتحويل المعلومات على شكل شجره لتستقبلها المكتبه
    const formatDataForTree = (list, parentId = null) => {
        return list
            .filter(m => {
                const mPid = m.parentId?._id || m.parentId;
                return mPid === parentId;
            })
            .map(m => ({
                name: m.firstName,
                attributes: { 
                    Relation: m.relation,
                    Gen: m.generation 
                },
                children: formatDataForTree(list, m._id) 
            }));
    };

useEffect(() => {
        const getOneTree = async (id) => {
            try {
                const treeData = await treeService.show(id);
                setTree(treeData);

                const treeMembers = await memberService.index(id); 
               
                // تحويل البيانات لشكل شجرة
                const structured = formatDataForTree(treeMembers);
                
                if (structured.length > 0) {
                    setFamilyData(structured[0]);
                }
            } catch (error) {
                console.error("Error loading tree data:", error);
            }
        };

        if (id) getOneTree(id);

    }, [id]);

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
            <div style={{ width: '100%', height: '500px' }}>
                {familyData ? 
                      (<Tree  
                        data={familyData}
                        orientation="vertical" 
                        pathFunc="step"/>
                    ) 
                      : (<p>No members found.</p>)}
            </div>
           


            <div>
                <Link onClick={() => findTreeToUpdate(id)} to={`/trees/${id}/update`}>Edit</Link>
                <br />
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default TreeDetail
