import UserService from "../services/user.service.js";

export const authorizeUser = async (req, res, next) => {
    const session = req.headers.cookie?.split(';').find(cookie => cookie.includes('sessionID'));
    if(session) {
        const sessionId = session.split("=")[1];
        req.sessionId = sessionId;
        const user = await UserService.getUserData(sessionId)
        req.userId = user.id;
        next();
    }
    else {
        res.status(403).json({ 'message': 'No user session found' })
    }
}