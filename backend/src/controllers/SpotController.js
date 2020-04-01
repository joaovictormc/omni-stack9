const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
    //SPOTS MOBILE
    async index(request, response) {
        const { tech } = request.query;

        const spots = await Spot.find({ techs: tech });

        return response.json(spots);
    },

    //SPOTS WEB
    async store(request, response) {
        const { filename } = request.file;
        const { company, techs, price } = request.body;
        const { user_id } = request.headers;

        const user = await User.findById(user_id);

        if (!user) {
            return response.status(400).json({ error: 'User does not exist' });
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        })

        return response.json(spot);
    },


    /*
    PROTOTIPO DE BOTÃO DELETAR SPOT
    async delete (request, response) {
        const { company } = request.params;
        const companyName = request.headers.company;
        
        const spots = await connection('spots')
            .where('company', company)
            .select('companyName')
            .first()

        if (spots.companyName !== companyName) {
            return response.status(401).json({ error: 'Operation not permited.' });
        }
        await connection('spots').where('company', company).delete();

        return response.status(204).send();
    }*/
}