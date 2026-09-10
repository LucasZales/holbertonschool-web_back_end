import signUpUser from "./4-user-promise.js";
import uploadPhoto from "./5-photo-reject.js";

const handleProfileSignup = (firstName, lastName, fileName) => {
    const promise1 = signUpUser(firstName, lastName);
    const promise2 = uploadPhoto(fileName);

    return Promise.allSettled([promise1, promise2])
        .then(results => results.map(result => {
            if (result.status === 'fulfilled') {
                return {
                    status: result.status,
                    value: result.value,
                };
            }

            return {
                status: result.status,
                value: result.reason.toString(),
            };
        }));
};

export default handleProfileSignup;
