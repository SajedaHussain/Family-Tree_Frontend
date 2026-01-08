import { useState, useEffect } from "react";
import * as memberService from "../../services/memberService";
import { Link, useNavigate, useParams } from "react-router-dom";

function MemberDetail({ findMemberToUpdate, deleteMember }) {
  const navigate = useNavigate();
  const { treeId, memberId } = useParams();

  const [member, setMember] = useState(null);

  useEffect(() => {
    const getOneMember = async () => {
      const data = await memberService.show(memberId);
      setMember(data);
    };

    if (memberId) getOneMember();
  }, [memberId]);

  const handleDelete = async () => {
    const deleted = await memberService.deleteOne(memberId);
    if (deleted) {
      deleteMember(memberId, treeId);
      navigate(`/trees/${treeId}/members`);
    } else {
      console.log("something went wrong");
    }
  };

  if (!member) return <h1>Loading...</h1>;

  return (
    <div>
      <h2>Member Details</h2>

      <p><strong>First Name:</strong> {member.firstName}</p>
      <p><strong>Last Name:</strong> {member.lastName}</p>
      <p><strong>Relation:</strong> {member.relation}</p>
      <p><strong>Date of Birth:</strong> {member.dateOfBirth}</p>

      {member.image && (
        <img src={member.image} alt={member.firstName} width="200" />
      )}

      <div>
        <Link
          to={`/trees/${treeId}/members/${memberId}/edit`}
          onClick={() => findMemberToUpdate(memberId)}
        >
          Edit
        </Link>

        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default MemberDetail;
