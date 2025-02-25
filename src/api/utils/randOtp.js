const otpGenerator = () => {
    const randInt = Math.floor((Math.random() * 10000));
    if (randInt > 999 && randInt < 10000) return randInt
    return otpGenerator()
}

module.exports = {otpGenerator};