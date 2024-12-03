module.exports = {
    success: (status, message, data) => {
        if (data !== undefined) {
            return {
                status,
                success: true,
                message,
                data,
            };
        }
        return {
            status,
            success: true,
            message,
        };
    },
    fail: (status, message) => {
        return {
            status,
            success: false,
            message,
        };
    },
    checkIsNum: string => {
        if (isNaN(string) === true) {
            return false;
        }
        return true;
    },
    checkIsInRange: page => {
        if (
            Number(page) < 0 ||
            !Number.isInteger(Number(page)) ||
            Number.isNaN(page) === true
        ) {
            return false;
        }
        return true;
    },
    validatePassword: password => {
        const lengthRegex = /^.{8,20}$/; // 8~20자
        const uppercaseRegex = /[A-Z]/; // 대문자 포함
        const lowercaseRegex = /[a-z]/; // 소문자 포함
        const numberRegex = /\d/; // 숫자 포함
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

        return (
            lengthRegex.test(password) &&
            uppercaseRegex.test(password) &&
            lowercaseRegex.test(password) &&
            numberRegex.test(password) &&
            specialCharRegex.test(password)
        );
    },
    validateNickname: nickname => {
        const lengthRegex = /^.{1,10}$/;
        const noSpaceRegex = /^\S*$/;
        return lengthRegex.test(nickname) && noSpaceRegex.test(nickname);
    },
    validateEmail: email => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    validateTitle: title => {
        return title && title.length <= 26;
    },
    duplicateNickname: (arr, nickname) =>
        arr.some(item => item.nickname === nickname),
    duplicateEmail: (arr, email) => arr.some(item => item.email === email),
};
