import CategoryAddNew from "module/category/CategoryAddNew";
import CategoryManage from "module/category/CategoryManage";
import CategoryUpdate from "module/category/CategoryUpdate";
import DashboardLayout from "module/dashboard/DashboardLayout";
import PostAddNew from "module/post/PostAddNew";
import PostManage from "module/post/PostManage";
import PostUpdate from "module/post/PostUpdate";
import UserAddNew from "module/user/UserAddNew";
import UserManage from "module/user/UserManage";
import UserProfile from "module/user/UserProfile";
import UserUpdate from "module/user/UserUpdate";
import CategoryPage from "pages/CategoryPage";
import DashboardPage from "pages/DashboardPage";
import PostDetailsPage from "pages/PostDetailsPage";
import SignInPage from "pages/SignInPage";
import UserPage from "pages/UserPage";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";
import { Suspense } from "react";
import React from "react";
import NotFoundPage from "pages/NotFoundPage";
const HomePage = React.lazy(() => import("./pages/HomePage"));

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/blog" element={<NotFoundPage></NotFoundPage>}></Route>
            <Route
              path="/contact"
              element={<NotFoundPage></NotFoundPage>}
            ></Route>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>

            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route
              path="/category/:name"
              element={<CategoryPage></CategoryPage>}
            ></Route>
            <Route path="/user/:name" element={<UserPage></UserPage>}></Route>
            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/manage/posts"
                element={<PostManage></PostManage>}
              ></Route>
              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="/profile"
                element={<UserProfile></UserProfile>}
              ></Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
