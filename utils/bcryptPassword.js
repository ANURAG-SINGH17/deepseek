import bcrypt from "bcryptjs";

const bcryptPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export default bcryptPassword;