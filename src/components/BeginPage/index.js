/** Libs */
import { useDispatch } from "react-redux";
/** Utils */
import { setMode } from "@store/actions";


const BeginPage = () => {
    //dispatch
    const dispatch = useDispatch();
    //func
    function openCalcHandler() {
        dispatch(setMode(true))
    }

    return (
        <main className="bg-orange-100 min-h-screen w-full flex-col flex items-center justify-center gap-8">
            <h1 className="text-4xl font-semibold">MEMBER.ID TEST</h1>
            <button onClick={openCalcHandler} className="btn">Open Calculator!</button>
        </main>
    );
}

export default BeginPage;