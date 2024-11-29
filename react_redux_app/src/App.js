import AddPostForm from "./components/AddPostForm";
import PostsList from "./components/PostsList";
import SinglePostPage from "./pages/SinglePostPage";
import Layout from "./pages/Layout";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import EditPostForm from "./components/EditPostForm";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
