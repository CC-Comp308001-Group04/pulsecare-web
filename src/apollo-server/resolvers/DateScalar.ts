import { Resolvers } from "@apollo/client";
import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",

  description: "Date custom scalar type",

  specifiedByURL:
    "https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/#example-the-date-scalar",

  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }

    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },

  parseValue(value) {
    if (typeof value === "number") {
      return new Date(value); // Convert incoming integer to Date
    }

    throw new Error("GraphQL Date Scalar parser expected a `number`");
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date

      return new Date(parseInt(ast.value, 10));
    }

    // Invalid hard-coded value (not an integer)

    return null;
  },
});

export const dateScalarResolver = {
  Date: dateScalar,
};
