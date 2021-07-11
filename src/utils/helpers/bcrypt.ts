import * as bcrypt from 'bcrypt';

export const encodePassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

export const decodePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
}