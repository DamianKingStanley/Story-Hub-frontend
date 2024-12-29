import React, { useContext } from "react";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import AdminRegister from "./pages/SignIn/AdminRegister";
import LogIn from "./pages/LogIn/LogIn";
import AdminLogIn from "./pages/LogIn/AdminLogIn";
import CreatePost from "./pages/CreatePost/CreatePost";
import AddChapter from "./pages/AddChapter/AddChapter";
import PublishedStories from "./pages/PublishedStories/PublishedStories";
import StoryDetails from "./pages/SinglePost/SinglePost";
import ChapterDetails from "./pages/ChapterDetails/ChapterDetails";
import StoryCategory from "./pages/StoryCategory/StoryCategory";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import UserUpdate from "./pages/UserDashboard/UserUpdate";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import Navbar from "./component/Navbar/Navbar";
import StoriesByStage from "./pages/StoriesByStage/StoriesByStage";
import AboutUs from "./pages/AboutUs/AboutUs";
import TermsOfUse from "./pages/TermsOfUse/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import LegitPage from "./pages/LegitPage/LegitPage";
import BusinessPage from "./pages/BusinessPage/BusinessPage";
import WriterBenefitPage from "./pages/WriterBenefitPage/WriterBenefitPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ShortNovelPage from "./pages/AllThreeCategoryPage/ShortNovelPage";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";

const AppContent = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="*" element={<NotFoundPage />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<SignIn />} />
          <Route exact path="/admin/register" element={<AdminRegister />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/admin/login" element={<AdminLogIn />} />
          <Route exact path="/create-story" element={<CreatePost />} />
          <Route
            exact
            path="/stories/:storyId/add-chapter"
            element={<AddChapter />}
          />
          <Route
            exact
            path="/available-stories"
            element={<PublishedStories />}
          />
          <Route exact path="/story/:id" element={<StoryDetails />} />
          <Route exact path="/chapter/:id" element={<ChapterDetails />} />
          <Route exact path="/stories/:genre" element={<StoryCategory />} />
          <Route
            exact
            path="/user/profile/:userId"
            element={<UserDashboard />}
          />
          <Route
            exact
            path="/user/profile/:userId/update"
            element={<UserUpdate />}
          />
          <Route exact path="/contests/:stage" element={<StoriesByStage />} />

          <Route exact path="/about-us" element={<AboutUs />} />
          <Route exact path="/terms-of-use" element={<TermsOfUse />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/storyhub-legit" element={<LegitPage />} />
          <Route exact path="/business" element={<BusinessPage />} />
          <Route exact path="/writer-benefit" element={<WriterBenefitPage />} />
          <Route
            exact
            path="/category/:category"
            element={<ShortNovelPage />}
          />
          <Route exact path="/stories/search" element={<SearchResultsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
