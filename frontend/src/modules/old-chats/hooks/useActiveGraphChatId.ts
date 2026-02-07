
import { useParams } from 'next/navigation';
import {isNil} from "lodash-es";

const useActiveGraphChatId=()=>{
    const params = useParams<{graphChatId: string | undefined}>();
    const activeGraphChatId = params.graphChatId;

    if(!isNil(activeGraphChatId)){
        return Number.parseInt(activeGraphChatId);
    }

    return undefined;
};

export default useActiveGraphChatId;