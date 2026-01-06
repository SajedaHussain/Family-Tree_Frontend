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
      <h1>Duck First Name: {pet.name}</h1>
      <h1>Pet Age : {pet.age}</h1>
      <h1>Breed :{pet.breed}</h1>
      <div>
        <Link onClick={() => findPetToUpdate(id)} to={`/pets/${id}/update`}>
          Edit
        </Link>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </div>
  );
}

export default PetDetails;
