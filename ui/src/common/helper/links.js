const devURL = "http://localhost:5001/"

const dev = {
    sign_up: devURL + "user/register",
    login: devURL + "user/login"
}

function getLinks() {
    return dev
}

export default getLinks
