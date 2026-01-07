import { useContext } from "react";
import { Routes, Route } from "react-router";

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
import MemberDetail from "./components/Member/MemberDetail";
import MemberList from "./components/Member/MemberList";

import { UserContext } from "./contexts/UserContext";

const App = () => {
  // Access the user object from UserContext
  // This gives us the currently logged-in user's information (username, email) that we extract from the token
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        {/* if the user is logged in we have the user object else we have the user set to null */}
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />

        <Route path="/tree/:id" element={<TreeDetail members={members} />} />
      </Routes>
    </>
  );
};

export default App;
