import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';


// Services
import * as treeService from './services/treeService';
import * as memberService from './services/memberService';

// Components
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';

// Member Components
import MemberList from './components/Member/MemberList';
import MemberDetail from './components/Member/MemberDetail';
import MemberForm from './components/Member/MemberForm';

// Tree Components
import TreeList from './components/Tree/TreeList';
import TreeDetail from './components/Tree/TreeDetail';
import TreeForm from './components/Tree/TreeForm';

const App = () => {
  const [trees, setTrees] = useState([]);
  const [members, setMembers] = useState([]);
  const [treeToUpdate, setTreeToUpdate] = useState(null);
  const [memberToUpdate, setMemberToUpdate] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const treesData = await treeService.index();
        setTrees(treesData || []);
        const membersData = await memberService.index();
        setMembers(membersData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchInitialData();
  }, []);

  // --- Tree functions ---
  const addTree = (newTree) => setTrees([...trees, newTree]);
  const updateOneTree = (updatedTree) => {
    setTrees(trees.map((t) => (t._id === updatedTree._id ? updatedTree : t)));
    setTreeToUpdate(null);
  };
  const deleteTrees = (id) => setTrees(trees.filter((t) => t._id !== id));
  const findTreeToUpdate = (id) => setTreeToUpdate(trees.find((t) => t._id === id));

  // --- Member functions ---
  const addMember = (newMember) => setMembers([...members, newMember]);
  const updateOneMember = (updatedMember) => {
    setMembers(members.map((m) => (m._id === updatedMember._id ? updatedMember : m)));
    setMemberToUpdate(null);
  };
  const deleteMember = (id) => setMembers(members.filter((m) => m._id !== id));
  const findMemberToUpdate = (id) => setMemberToUpdate(members.find((m) => m._id === id));

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Tree Routes */}
        <Route path="/trees" element={<TreeList trees={trees} />} />
        <Route path="/trees/new" element={<TreeForm updateTrees={addTree} />} />
        <Route path="/trees/:id" element={ <TreeDetail findTreeToUpdate={findTreeToUpdate} deleteTrees={deleteTrees}  /> }/>
        <Route path="/trees/:id/update" element={ <TreeForm treeToUpdate={treeToUpdate} updateOneTree={updateOneTree} /> }/>

        {/* Member Routes */}
        <Route path="/members" element={<MemberList members={members} />} />
        <Route path="/members/new" element={<MemberForm updateMembers={addMember} trees={trees}members={members} /> }/>
        <Route path="/members/:id" element={<MemberDetail findMemberToUpdate={findMemberToUpdate} deleteMember={deleteMember} /> } />
        <Route path="/members/:id/update" element={<MemberForm memberToUpdate={memberToUpdate} updateOneMember={updateOneMember} trees={trees} members={members}/>}/>
      </Routes>
    </>
  );
};

export default App;
