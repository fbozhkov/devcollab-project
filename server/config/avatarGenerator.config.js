const avatarUrl = (username) => {
    const imageSize = 128;
    const charLength = 1;
    const background = 'random';
    
    const url = `https://ui-avatars.com/api/?name=${username}&size=${imageSize}&length=${charLength}&background=${background}`
    
    return url
}

export default avatarUrl