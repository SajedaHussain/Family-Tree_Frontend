import React from "react";
import { useState, useEffect } from "react";
import * as duckServise from "../../services/memberService";
import { Link, useNavigate, useParams } from "react-router";

function DuckDetails(props) {
  const navigate = useNavigate();
  const { id } = useParams(); // same as req.params
  const { findDuckToUpdate, deleteDuck } = props;

  const [duck, setDuck] = useState(null);

  useEffect(() => {
    const getOneDuck = async (id) => {
      const duck = await memberService.show(id);
      setDuck(duck);
    };
    if (id) getOneDuck(id); //if teh id is exist the call the function
  }, [id]);

  const handleDelete = async () => {
    const deletedDuck = await memberService.deleteOne(id);
    if (deletedDuck) {
      deleteDuck(id);
      navigate("/");
    } else {
      console.log("somthing wrong");
    }
  };

  if (!id) return <h1>Loading ...</h1>;
  if (!duck) return <h1>Loading.....</h1>;
  return (
    <div>
      DuckDetails{id}
      <h1>Duck's First Name: {duck.firstName}</h1>
      <h1> Last Name : {duck.lastName}</h1>
      <h1> Gender : {duck.gender}</h1>
      <h1> Date Of Birth : {duck.dateOfBirth}</h1>
      <h1> image : {duck.image}</h1>
      <div>
        <Link onClick={() => findDuckToUpdate(id)} to={`/ducks/${id}/update`}>
          Edit
        </Link>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </div>
  );
}

export default DuckDetails;
