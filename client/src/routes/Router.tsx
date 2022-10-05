import { SigninPage, SignupPage, TodoPage } from 'pages';
import { Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route path="/auth/signin" element={<SigninPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      <Route path="/" element={<TodoPage />} />
    </Routes>
  );
};

export default Router;
