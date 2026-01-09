//IMPORT ==========================================================================================
import { useState, useEffect } from "react";
import * as memberService from "../../../services/memberService";
import { Link, useNavigate, useParams } from "react-router-dom";
import './MemberDetail.css'

function MemberDetail(props) {
  const navigate = useNavigate();
  const { memberId, treeId } = useParams(); // same as req.params
  const { findMemberToUpdate, deleteMember } = props;

  const [member, setMember] = useState(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    const getOneMember = async (memberId) => {
      const member = await memberService.show(memberId);
      setMember(member);
      // navigate(`/members/${memberId}`)
    };
    if (memberId) getOneMember(memberId); //if teh id is exist the call the function
  }, [memberId]);

   const handleUpdateClick = () => {
    findMemberToUpdate(memberId);
    navigate(`/trees/${treeId}/members/${memberId}/edit`, { state: { code } }); 
  };

 const handleDelete = async () => {
  if (!code) return alert("Enter family code");

  try {
    const deletedMember = await memberService.deleteOne(memberId, member.treeId, code);

    if (deletedMember) {
      deleteMember(memberId);
      navigate(`/trees/${member.treeId}/members`);
    }
  } catch (error) {
    console.log("Something went wrong:", error);
    alert("Failed to delete member. Make sure the code is correct.");
  }
};

  if (!member) return <h1>Loading.....</h1>;

  return (
    <div className="member-detail-container">
      <h2>{member.firstName} {member.lastName}</h2>
      <p> Relation : {member.relation}</p>
      <p>Generation: {member.generation}</p>
      <p>Date Of Birth: {new Date(member.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <img src={member.image} alt="member" width={200}/>      
      <label>Family Code (required to edit/delete):</label>
      <input type="text" value={code} onChange={event => setCode(event.target.value)} />

      <button onClick={handleUpdateClick}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default MemberDetail;
