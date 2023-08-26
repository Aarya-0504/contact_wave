import Navbar from "./Navbar2.js";
const layout=({navbar=true,children})=>{
    return (<>
    {navbar && <Navbar/>}
        <div className="container my-3">{children}</div>
    </>
    );
    };

    export default layout;