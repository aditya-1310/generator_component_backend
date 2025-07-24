import Session from "../model/sessionModel.js";

export const createSessionService = async ({userId, sessionName})=>{
    try{
        const response = await Session.create({userId, sessionName});
        return response;
    }
    catch(error){
        console.log("Erron at session creation service layer");
        throw error;
    }
};

export const getAllSessionService = async()=>{
    try{
        const response = await Session.find();
        return response;
    }
    catch(error){
        console.log("Error at the session layer in geting all the session");
        throw error;
    }
}

export const getSessionById = async(sessionId)=>{
    try{
        console.log(sessionId);


        const response = await Session.findById(sessionId);
        
        return response;
    }
    catch(error){
        console.log("Error at the service layer in gettingThe sessionbyID");
        throw error;
    }
};



