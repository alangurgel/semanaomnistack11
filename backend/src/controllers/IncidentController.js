const connection = require('../database/connection');

module.exports = {
    async index(request, response){ //LISTAR TODOS OS CASOS CADASTRADOS
        const { page = 1 } = request.query; //PAGINAÇÃO PARA APARECER 5 CASOS POR PAGINA

        const [count] = await connection('incidents').count();//CONTADOR DE QUANTIDADE DE CASOS
        
        const incidents = await connection('incidents')
        .join('ongs', 'ong_id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1)*5)
        .select([
            'incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);//MANDARÁ PRO HEADER DA PAGINA O TOTAL DE CASOS

        return response.json(incidents);

    },
    async create(request, response){ //CRIAR NOVA ONG
        const {title, description, value } = request.body;
        const ong_id = request.headers.authorizarion;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,

        });

        return response.json({id});       

    },
    async delete(request, response){ //DELETAR ONG 
        const {id} = request.params;
        const ong_id = request.headers.authorizarion;

        const incident = await connection('incidents')
        .where('id',id)
        .select('ong_id')
        .first();

        if (incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted.'});
        }
        await connection('incidents').where('id',id).delete();

        return response.status(204).send();

    }

};