import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';

export function verifyjsontoken(req, res, next)
{
    let token = req.cookies.authToken;

    if (token)
    {
        try
        {
            const decoded = jwt.verify(token, process.env.JWT_SKEY);
            console.log(decoded);
            req.utype = decoded.role;
            req.id = decoded.id;
            return next();
        }
        catch (e)
        {
            return res.status(400).json({ statuscode: 0, msg: "Invalid Token" });
        }
    }

    const refreshtoken = req.cookies.refreshToken;
    if (!refreshtoken)
    {
        return res.status(400).json({ statuscode: 0, msg: "Session expired. Please log in again." });
    }
    try
    {
        const decoded = jwt.verify(refreshtoken, process.env.JWT_REFRESH_SKEY);
        const newauthToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SKEY, { expiresIn: "15m" })

        res.cookie("authToken", newauthToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000,
        });

        req.utype = decoded.role;
        req.id = decoded.id;
        return next();
    }
    catch (e)
    {
        return res.status(400).json({ statuscode: 0, msg: "Invalid Refresh Token." });
    }
}

export function verifyadmin(req, res, next)
{
    console.log(req.utype);

    if (req.utype === "admin")
    {
        return next();
    }
    else
    {
        return res.status(400).json({ statuscode: 0, msg: "Only Admin can access." });
    }
}

export function verifyteacher(req, res, next)
{
    console.log(req.utype);

    if (req.utype === "teacher")
    {
        return next();
    }
    else
    {
        return res.status(400).json({ statuscode: 0, msg: "Only Teacher can access." });
    }
}