import { useState } from "react";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
const [isLogin, setIsLogin] = useState(true);
const navigate = useNavigate();

const handleSuccess = () => {
  navigate("/dashboard");
};
  return (
    <AuthForm 
      isLogin={isLogin} 
      onToggle={() => setIsLogin(!isLogin)}
      onSuccess={handleSuccess}
    />
  );
};

export default AuthPage;
