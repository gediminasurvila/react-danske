const { getDataFromRest } = require('./helpers');

module.exports = {
    Query: {
        request: async (parent, args, context, info) => {
                const input = args.input;
                // Fetch REST endpoints
                const data = await getDataFromRest(input);
                return data;
            }
        }
}