//IMPORT ==========================================================================================
import { useState, useEffect } from "react";
import * as memberService from "../../../services/memberService";
import { Link, useNavigate, useParams } from "react-router";

function MemberDetail(props) {
  const navigate = useNavigate();
  const { id } = useParams(); // same as req.params
  const { findMemberToUpdate, deleteMember } = props;

  const [member, setMember] = useState(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    const getOneMember = async (id) => {
      const member = await memberService.show(id);
      setMember(member);
      navigate(`/members/${id}`)
    };
    if (id) getOneMember(id); //if teh id is exist the call the function
  }, [id]);

   const handleUpdateClick = () => {
    findMemberToUpdate(id);
    navigate(`/members/${id}/update`, { state: { code } }); // نمرر الكود للمكون الجديد
  };

  const handleDelete = async () => {
    if (!code) return console.log('Enter family code to delete this member');
    try{
    const deletedMember = await memberService.deleteOne(id, { tree_id: member.tree_id, code });
    if (deletedMember) {
      deleteMember(id);
     navigate("/members");
    }
  }catch(error){
    console.log("somthing wrong");
    }
  }

  if (!member) return <h1>Loading.....</h1>;

  return (
    <div>
      <h2>{member.firstName} {member.lastName}</h2>
      <p> Relation : {member.relation}</p>
      <p>Generation: {member.generation}</p>
      <p>Date Of Birth: {member.dateOfBirth}</p>
      <img src={member.image} alt="member" width={200}/>      

      <label>Family Code (required to edit/delete):</label>
      <input type="text" value={code} onChange={event => setCode(event.target.value)} />

      <button onClick={handleUpdateClick}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default MemberDetail;
