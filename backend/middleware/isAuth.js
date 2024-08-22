import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res
      .status(208)
      .json({ isError: true, authError: true, message: "Failed No token" });
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return res
      .status(208)
      .json({ isError: true, authError: true, message: "Failed Not good" });
  }

  if (!decodedToken) {
    return res
      .status(208)
      .json({ isError: true, authError: true, message: "Failed Token expire" });
  }
  // if(decodedToken.role==569){

  // }
  req.userId = decodedToken.id;
  next();
};

export { isAuth };