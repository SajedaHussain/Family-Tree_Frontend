import { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";


// Services ==================================================================================================
import * as treeService from "./services/treeService";
import * as memberService from "./services/memberService";
import * as profileService from "./services/profileService";
import * as personalityService from "./services/personalityService";

// Components ================================================================================================
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from './components/Dashboard/Dashboard';
import ProfilePage from "./components/Profile/ProfilePage";

// Tree Components ===========================================================================================
import TreeList from "./components/Tree/TreeList/TreeList";
import TreeDetail from "./components/Tree/TreeDetail/TreeDetail";
import TreeForm from "./components/Tree/TreeForm/TreeForm";

// Member Components =========================================================================================
import MemberList from "./components/Member/MemberList/MemberList";
import MemberDetail from "./components/Member/MemberDetail/MemberDetail";
import MemberForm from "./components/Member/MemberForm/MemberForm";

//Auth Components ===========================================================================================
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm"

// Personality Components ===================================================================================
import PersonalityForm from "./components/Personality/PersonalityForm/PersonalityForm";
import PersonalityList from "./components/Personality/PersonalityList/PersonalityList";
import PersonalityDetail from "./components/Personality/PersonalityDetail/PersonalityDetail";

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const [trees, setTrees] = useState([]);
  const [members, setMembers] = useState([]);
  const [treeToUpdate, setTreeToUpdate] = useState(null);
  const [memberToUpdate, setMemberToUpdate] = useState(null);
  const [profile, setProfile] = useState(null);
  const [personalities, setPersonalities] = useState([]);
  const [personalityToUpdate, setPersonalityToUpdate] = useState(null);


  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const treeData = await treeService.index();
         console.log("Fetched trees:", treeData);
        const memberData = await memberService.index();
        const personalityData = await personalityService.index();
        setTrees(treeData || []);
        setMembers(memberData || []);
        setPersonalities(personalityData || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  //TREE FUNCTIONS =========================================================================================
  const addTree = (newTree) => {
    setTrees([...trees, newTree]);

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


  //MEMBER FUNCTION =========================================================================================
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

  //Profile Functin =========================================================================================
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const userProfile = await profileService.getMyProfile();
        setProfile(userProfile || null);
      }
    };
    fetchProfile();
  }, [user]);
  console.log("USER FROM CONTEXT:", user);

  //Personality Function =========================================================================================
  const addPersonality = (newPersonality) => {
    setPersonalities([...personalities, newPersonality]);
    navigate("/personalities");
  };

  const updateOnePersonality = (updatedPersonality) => {
    setPersonalities(
      personalities.map(person =>
        person._id === updatedPersonality._id ? updatedPersonality : person
      )
    );
    setPersonalityToUpdate(null);
    navigate("/personalities");
  };

  const deletePersonality = (id) => {
    setPersonalities(personalities.filter(person => person._id !== id));
    navigate("/personalities");
  };

  const findPersonalityToUpdate = (id) => {
    setPersonalityToUpdate(
      personalities.find(person => person._id === id)
    );
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
        <Route path="/trees/new" element={<TreeForm updateTrees={addTree} />} />
        <Route path="/profile" element={<ProfilePage profile={profile} setProfile={setProfile} />} />
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
        <Route path="/personalities" element={ <PersonalityList personalities={personalities} />}  />
        <Route path="/personalities/new" element={ <PersonalityForm addPersonality={addPersonality}  />} />
        <Route path="/personalities/:personalityId" element={<PersonalityDetail
              deletePersonality={deletePersonality}
              findPersonalityToUpdate={findPersonalityToUpdate}
            />  } />

        <Route path="/personalities/:personalityId/edit" element={ <PersonalityForm
              personalityToUpdate={personalityToUpdate}
              updateOnePersonality={updateOnePersonality}
            /> } />
      </Routes>
    </>
  );
};

export default App;
