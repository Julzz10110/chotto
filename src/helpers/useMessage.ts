import { ref } from 'vue';
import { Reply } from '../types';

interface Message {
    id: string
    text: string
    file?: UploadedFile
    reply?: Reply
    forceSend: boolean
}

interface UploadedFile{
    url: string
    name: string
    size: Number
    type: string
}

const messages = ref<Message[]>([])

export const useMessage = (outId : string) => {

    const index = ref<number>(0)

    let foundMessage = messages.value.find(({id}) => id == outId)
    if (foundMessage != undefined){
        index.value = messages.value.indexOf(foundMessage)
    } 
    else {
        messages.value.push({
            id: outId,
            text: '',
            file: undefined,
            forceSend: false,
        })
        index.value = messages.value.length - 1
    }
    
/**================================================================ */

    const resetMessage = () => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: '',
            file: undefined,
            reply: undefined,
            forceSend: false,
        }
    }

    const setMessageText = (text : string) => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: text,
            file: getMessage().file,
            reply: getMessage().reply,
            forceSend: false,
        }
    }

    const setMessageFile = (file : UploadedFile) => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: getMessage().text,
            file: file,
            reply: getMessage().reply,
            forceSend: false,
        }
    }

    const resetMessageFile = () => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: getMessage().text,
            file: undefined,
            reply: getMessage().reply,
            forceSend: false,
        }
    }

    const setReply = (reply : Reply) => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: getMessage().text,
            file: getMessage().file,
            reply: reply,
            forceSend: false,
        }
    }

    const resetReply = () => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: getMessage().text,
            file: getMessage().file,
            reply: undefined,
            forceSend: false,
        }
    }

    function getMessage () {
        return messages.value[index.value]
    }

    const setForceSendMessage = (val : boolean) => {
        messages.value[index.value].forceSend = val
    } 

    return {
        getMessage,
        resetMessage,
        setMessageFile,
        resetMessageFile,
        setMessageText,
        setReply,
        resetReply,
        setForceSendMessage
    }
}
