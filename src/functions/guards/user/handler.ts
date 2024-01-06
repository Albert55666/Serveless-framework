import JWT from "jsonwebtoken";
const generatePolicy = (principalId: any, effect: string, resource: string) => {
  // Required output:
  const authResponse: any = {
    principalId,
  };
  authResponse.principalId = principalId;
  if (effect && resource) {
    let policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    };
    authResponse.policyDocument = policyDocument;
  }
  // Optional output with custom properties of the String, Number or Boolean type.
  authResponse.context = {
    stringKey: "stringval",
    numberKey: 123,
    booleanKey: true,
  };
  return authResponse;
};

const ValidateJwtAuth = async (event) => {
  const authToken = event.authorizationToken;
  const authArray = authToken.split(" ");
  const token = authArray[1];
  if (authArray.length !== 2 || authArray[1].length === 0) {
    return generatePolicy("undefined", "Deny", "*");
  }
  try {
    const decoded = JWT.verify(
      token,
      process.env.JWT_KEY
    ) as JWTPayloadInterface;
    if (decoded) {
      const decodedString = JSON.stringify(decoded);
      return generatePolicy(decodedString, "Allow", "*");
    }
    return generatePolicy("undefined", "Deny", "*");
  } catch (error) {
    return generatePolicy("undefined", "Deny", "*");
  }
};

export const main = ValidateJwtAuth;
