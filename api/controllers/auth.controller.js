import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user And save to DB

        const newUser = await prisma.user.create({
          data:{
            username,
            email,
            password: hashedPassword
          },
        });
        console.log(newUser);
        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (err) {
        return res.status(500).json({ message: "Failee to create user" });
    }
};

export const logIn = async (req, res) => {

  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials!" });
    
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign({
      id: user.id,
      isAdmin: false
    }, process.env.JWT_SECRET, {expiresIn: age})

    const {password:userPassword , ...userInfo} = user;

    // res.setHeader("Set-Cookie", `test=myValue; HttpOnly; Path=/`);
    res.cookie("token", token, {
      httpOnly: true,
      //secure: true,
      maxAge: age
    }).status(200)
      .json({user: userInfo});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const logOut = (req, res) => {
    res.clearCookie("token").status(200).json({message: "Logout Successful"})
}