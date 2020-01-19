const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

const { findConnection, sendMessage } = require('../websocket');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            // Filtro de conexões que seguem o pad~rao de 10KM de distância e que possuem 1 das Techs

            const sendSocketMessageTo = findConnection(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.json(dev);
    }
};