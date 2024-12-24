import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = ({ from }) => {
    const { loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await loginWithGoogle();
            console.log(result.user);
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <div className="divider">OR</div>
            <div className="flex justify-center my-5">
                <button onClick={handleGoogleLogin} className="btn w-full">
                <FaGoogle />
                Login with Google</button>
            </div>
        </>
    );
};

export default SocialLogin;