import useActiveGraphChatId from "@/modules/chats/hooks/useActiveGraphChatId";
import {isNil} from "lodash-es";
import {useGetGraphChatsList} from "@/api/rest-client";

const useActiveGraphChatData=()=>{
    const activeChatId = useActiveGraphChatId();


    const {data: chatsList} = useGetGraphChatsList();

    if(!isNil(activeChatId)){

        const activeChat=chatsList?.find(({id})=>id === activeChatId);

        return activeChat;

    }

    return undefined;
};

export default useActiveGraphChatData;