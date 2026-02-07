
import { useParams } from 'next/navigation';
import {isNil} from "lodash-es";

const useActiveLinearChatId=()=>{
    const params = useParams<{linearChatId: string | undefined}>();
    const activeLinearChatId = params.linearChatId;

    if(!isNil(activeLinearChatId)){
        return Number.parseInt(activeLinearChatId);
    }

    return undefined;
};

export default useActiveLinearChatId;