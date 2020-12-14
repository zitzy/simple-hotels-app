const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLList,
} = require('graphql/type');

const hotelsQuery = require('./services/hotels');

const HotelType = new GraphQLObjectType({
  name: 'Hotel',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    location: { type: GraphQLString },
    pricePerNight: { type: GraphQLFloat },
    imageUrl: { type: GraphQLString },
    rating: { type: GraphQLFloat },
  }),
});

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hotel: {
      type: new GraphQLList(HotelType),
      resolve: async () => {
        const output = await hotelsQuery();

        return output;
      },
    },
  },
});

const schema = new GraphQLSchema({ query });

module.exports = schema;
