import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout/DefaultLayout";
import { userRoutes } from "./routes";

function App() {
  return (
    <div className="App">
      <Routes>
        {userRoutes.map((route, index) => {
          const Page = route.component;

          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
