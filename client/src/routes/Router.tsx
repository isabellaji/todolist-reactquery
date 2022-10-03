import { SigninPage } from 'pages';
import { Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route path="/auth/signin" element={<SigninPage />} />
    </Routes>
  );
};

export default Router;
