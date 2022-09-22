import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
//
import { canvasActions } from "../store/slices/canvasSlice";
import { previewActions } from '../store/slices/previewSlice';

const AllActions: any = {
    ...canvasActions,
    ...previewActions,
}


const useActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(AllActions, dispatch)
}

export default useActions