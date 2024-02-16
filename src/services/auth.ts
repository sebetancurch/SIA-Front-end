'use server'

export const validateUser = async (user: {email: string, password: string}) => {
    try {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('sessionToken');
            }, 3000);
        });
    } catch (e) {
        console.log(e);
    }
}