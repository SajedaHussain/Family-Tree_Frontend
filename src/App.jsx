import { useState, useEffect, useContext } from "react";
import { Routes, Route, Link } from "react-router";
import { useNavigate } from "react-router";

//Service:
import * as treeService from "./services/treeService";
import * as memberService from "./services/memberService";

//Components:
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";

import TreeDetail from "./components/Tree/TreeDetail";
import TreeForm from "./components/Tree/TreeForm";
import TreeList from "./components/Tree/TreeList";

import MemberForm from "./components/Member/MemberForm";
import MemberDetails from "./components/Member/MemberDetail";
import MemberList from "./components/Member/MemberList";

import { UserContext } from "./contexts/UserContext";

const App = () => {
  // Access the user object from UserContext
  // This gives us the currently logged-in user's information (username, email) that we extract from the token
  const { user } = useContext(UserContext);
  const [trees, setTrees] = useState([]);
  const [members, setMembers] = useState([]);
  const [treeToUpdate, setTreeToUpdate] = useState(null);
  const [memberToUpdate, setMemberToUpdate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const treeData = await treeService.index();
        setTrees(treeData);

        const memberData = await memberService.index();
        setMembers(memberData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllData();
  }, []);

  // -------- TREE FUNCTIONS --------
  const updateOneTree = (updatedTree) => {
    setTrees(trees.map((t) => (t._id === updatedTree._id ? updatedTree : t)));
    setTreeToUpdate(null);
    navigate("/trees");
  };

  const deleteTrees = (id) => {
    setTrees(trees.filter((t) => t._id !== id));
    navigate("/trees");
  };

  const findTreeToUpdate = (id) => {
    setTreeToUpdate(trees.find((t) => t._id === id));
  };

  const addTree = (newTree) => {
    setTrees([...trees, newTree]);
    navigate("/trees");
  };

  // -------- MEMBER FUNCTIONS --------

  const addMember = (newMember) => {
    setMembers([...members, newMember]);
    navigate("/members");
  };

  const updateOneMember = (updatedMember) => {
    setMembers(members.map((m) => (m._id === updatedMember._id ? updatedMember : m)));
    setMemberToUpdate(null);
    navigate("/members");
  };

  const deleteMember = (id) => {
    setMembers(members.filter((m) => m._id !== id));
    navigate("/members");
  };

  const findMemberToUpdate = (id) => {
    setMemberToUpdate(members.find((m) => m._id === id));
  };

  return (
    <>
      <NavBar />
      <Routes>
        {/* Auth & Home */}
        {/* if the user is logged in we have the user object else we have the user set to null */}
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />

        {/* Trees */}
        <Route path="/trees" element={<TreeList trees={trees} />} />
        <Route path="/trees/new" element={<TreeForm updateTrees={addTree} />} />
        <Route
          path="/trees/:id"
          element={
            <TreeDetail
              members={members}
              deleteTrees={deleteTrees}
              findTreeToUpdate={findTreeToUpdate}
            />
          }
        />
        <Route
          path="/trees/:id/update"
          element={<TreeForm treeToUpdate={treeToUpdate} updateOneTree={updateOneTree} />}
        />

        {/* Members */}
        <Route path="/members" element={<MemberList members={members} />} />
        <Route
          path="/members/new"
          element={<MemberForm updateMembers={addMember} members={members} />}
        />
        <Route
          path="/members/:id"
          element={
            <MemberDetails deleteMember={deleteMember} findMemberToUpdate={findMemberToUpdate} />
          }
        />
        <Route
          path="/members/:id/update"
          element={
            <MemberForm
              memberToUpdate={memberToUpdate}
              updateOneMember={updateOneMember}
              members={members}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
