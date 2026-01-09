import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Services
import * as treeService from "./services/treeService";
import * as memberService from "./services/memberService";

// Components
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from './components/Dashboard/Dashboard';

// Tree Components
import TreeList from "./components/Tree/TreeList/TreeList";
import TreeDetail from "./components/Tree/TreeDetail/TreeDetail";
import TreeForm from "./components/Tree/TreeForm/TreeForm";

// Member Components
import MemberList from "./components/Member/MemberList/MemberList";
import MemberDetail from "./components/Member/MemberDetail/MemberDetail";
import MemberForm from "./components/Member/MemberForm/MemberForm";

//Auth Components
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm"

const App = () => {
  const [trees, setTrees] = useState([]);
  const [members, setMembers] = useState([]);
  const [treeToUpdate, setTreeToUpdate] = useState(null);
  const [memberToUpdate, setMemberToUpdate] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const treeData = await treeService.index();
        const memberData = await memberService.index();
        setTrees(treeData || []);
        setMembers(memberData || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  //TREE FUNCTIONS 
  const addTree = (newTree) => {
    setTrees([...trees, newTree]);
    navigate(`/trees/${newTree._id}/members`);
  };

  const updateOneTree = (updatedTree) => {
    setTrees(trees.map(tree =>
      tree._id === updatedTree._id ? updatedTree : tree
    ));
    setTreeToUpdate(null);
    navigate("/trees");
  };

  const deleteTree = (id) => {
    setTrees(trees.filter(tree => tree._id !== id));
    navigate("/trees");
  };

  const findTreeToUpdate = (id) => {
    setTreeToUpdate(trees.find(tree => tree._id === id));
  };

  //MEMBER FUNCTION 
  const addMember = (newMember, treeId) => {
    setMembers([...members, newMember]);
    navigate(`/trees/${treeId}/members`);
  };

  const updateOneMember = (updatedMember, treeId) => {
    setMembers(members.map(memb =>
      memb._id === updatedMember._id ? updatedMember : memb
    ));
    setMemberToUpdate(null);
    navigate(`/trees/${treeId}/members`);
  };

  const deleteMember = (id, treeId) => {
    setMembers(members.filter(memb => memb._id !== id));
   
  };

  const findMemberToUpdate = (id) => {
    setMemberToUpdate(members.find(memb => memb._id === id));
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard trees={trees} members={members} />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />  
        <Route path="/trees" element={<TreeList trees={trees} />} />
        <Route
          path="/trees/new"
          element={<TreeForm updateTrees={addTree} />}
        />
        <Route
          path="/trees/:treeId"
          element={
            <TreeDetail
              deleteTree={deleteTree}
              findTreeToUpdate={findTreeToUpdate}
            />
          }
        />
        <Route
          path="/trees/:treeId/edit"
          element={
            <TreeForm
              updateOneTree={updateOneTree}
               trees={trees}
            />
          }
        />
        <Route
          path="/trees/:treeId/members"
          element={
            <MemberList
              members={members}
            />
          }
        />
        <Route
          path="/trees/:treeId/members/new"
          element={
            <MemberForm
              updateMembers={addMember}
              members={members}
            />
          }
        />
        <Route
          path="/trees/:treeId/members/:memberId"
          element={
            <MemberDetail
              deleteMember={deleteMember}
              findMemberToUpdate={findMemberToUpdate}
            />
          }
        />
        <Route
          path="/trees/:treeId/members/:memberId/edit"
          element={
            <MemberForm
              memberToUpdate={memberToUpdate}
              updateOneMember={updateOneMember}
              trees={trees}
              members={members}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
