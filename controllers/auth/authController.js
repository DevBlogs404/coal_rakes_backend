const { PrismaClient } = require("@prisma/client");
const jose = require("jose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

async function RegisterController(req, res) {
  const { firstName, lastName, email, password, role, phone } = req.body;

  const isAlreadyAUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isAlreadyAUser) {
    return res.status(400).json({
      success: false,
      message: "Email Already Exists",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        phone,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        phone: true,
      },
    });

    // const alg = "HS256";

    // const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // const token = await new jose.SignJWT({ email: newUser.email })
    //   .setProtectedHeader({ alg })
    //   .setExpirationTime("24h")
    //   .sign(secret);

    // res.cookie("auth_cookie", token, {
    //   withCredentials: true,
    //   secure: true,
    //   httpOnly: true,
    //   expires: 24 * 60 * 60 * 1000,
    // });

    res.status(200).json({
      success: true,
      message: "user registered successfully",
      newUser,
    });
  }
}

async function LogInController(req, res) {
  const { email, password } = req.body;

  const userWithEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userWithEmail) {
    return res.status(400).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  const isMatch = await bcrypt.compare(password, userWithEmail.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid Password",
    });
  }

  const alg = "HS256";

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({ email: userWithEmail.email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  res.cookie("auth_cookie", token, {
    withCredentials: true,
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "lax",
  });

  res.status(200).json({
    success: true,
    message: "User Login Successful",
  });
}

async function me(req, res) {
  const authCookie = req.cookies.auth_cookie;
  const data = jwt.verify(authCookie, process.env.JWT_SECRET);
  console.log(data);
  if (data) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        phone: true,
      },
    });
    res.status(200).json({ user });
  }
}

module.exports = { RegisterController, LogInController, me };
