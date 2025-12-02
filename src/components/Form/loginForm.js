"use client";
import SafeLink from "@/components/Core/SafeLink";

const Login = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
    const handleSubmit = () => {

    };
    
    return(
        <div className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}>
            {data.data.message.header && <h3>{data.data.message.header}</h3>}
            {data.data.message.message && <p>{data.data.message.message}</p>}
            <div className="tx-felogin-pi1">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                required="required"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btn"
                                value="Login"
                            />
                        </div>
                    </fieldset>
                </form>
            </div>
            <SafeLink href={"/"}>Forgot your password?</SafeLink>
        </div>
    )
};
export default Login;