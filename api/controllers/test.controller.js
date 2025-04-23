import jwt from "jsonwebtoken"

export const shouldBeLoggedIn = async (req, res) => {
    console.log(req.userId);
    res.status(200).json({ message: "You are Authenticated" });
}

export const shouldBeAdmin = async (req, res) => {
    const token = req.cookie.token;
    if(!token) return res.status(401).json({message: "Not Authenticated!"});
    jwt.verify(token, process.env.JWT_SECRET, async (err, paylod) => {
        if(err) return res.status(403).json({ message: "Token is not Valid!" });
        if(!paylod.isAdmin) return res.status(403).json({message : "not authorized!"})
    })
    res.status(200).json({message: "You are Authenticated" });
}