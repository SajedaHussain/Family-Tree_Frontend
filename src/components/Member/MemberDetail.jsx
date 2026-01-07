import React from "react";
import { useState, useEffect } from "react";
import * as memberService from "../../services/memberService";
import { Link, useNavigate, useParams } from "react-router";

function MemberDetails(props) {
  const navigate = useNavigate();
  const { id } = useParams(); // same as req.params
  const { findMemberToUpdate, deleteMember } = props;

  const [member, setMember] = useState(null);

  useEffect(() => {
    const getOneMember = async (id) => {
      const member = await memberService.show(id);
      setMember(member);
    };
    if (id) getOneMember(id); //if teh id is exist the call the function
  }, [id]);

  const handleDelete = async () => {
    const deletedMember = await memberService.deleteOne(id);
    if (deletedMember) {
      deleteMember(id);
      navigate("/");
    } else {
      console.log("somthing wrong");
    }
  };

  if (!id) return <h1>Loading ...</h1>;
  if (!member) return <h1>Loading.....</h1>;
  return (
    <div>
      MemberDetails{id}
      <h1>Member's First Name: {member.firstName}</h1>
      <h1> Last Name : {member.lastName}</h1>
      <h1> Gender : {member.gender}</h1>
      <h1> Date Of Birth : {member.dateOfBirth}</h1>
      <h1> image : {member.image}</h1>
      <div>
        <Link onClick={() => findMemberToUpdate(id)} to={`/members/${id}/update`}>
          Edit
        </Link>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </div>
  );
}

export default MemberDetails;
