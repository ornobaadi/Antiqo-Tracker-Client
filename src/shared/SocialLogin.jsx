import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";

const SocialLogin = () => {
    const { loginWithGoogle } = useContext(AuthContext);

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <>
            <div className="divider">OR</div>
            <div className="flex justify-center my-5">
                <button onClick={handleGoogleLogin} className="btn">Login with Google</button>
            </div>
        </>
    );
};

export default SocialLogin;