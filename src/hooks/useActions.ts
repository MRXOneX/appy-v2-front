import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
//
import { canvasActions } from "../store/slices/canvasSlice";

const AllActions: any = {
    ...canvasActions
}


const useActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(AllActions, dispatch)
}

export default useActions