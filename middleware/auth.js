const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"] 
    // Auth token comes as "Bearer <auth-token>" so we split to separate
    const token = authHeader ? authHeader.split(" ")[1] : null
    if (token == null){
        return res.json("Page unauthoerized")
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = { authenticateToken }