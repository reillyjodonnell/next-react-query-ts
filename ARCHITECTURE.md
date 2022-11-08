# Project's Architecture

## Serverless/ Server

### Serverless Pros and Cons

Pros:

- (infinite) horizontal scaling

Cons:

- The coldstart is really the strongest con. Although there are platforms that do a great job of keeping the coldstart at a minumum.

## Framework/ Tools

### Next.js

Since next is a backend framework the necessity for creating a server is abstracted away. We can instead define endpoints inside of the api folder and have next handle those for us.

### Typescript

Types are super useful and make for a pleasant experience for everyone we are making decisions to ensure that we have types for both speed of development and overall DX.

### tRPC

To break the monotony of generating types to match the API structure we are using tRPC. This allows us to create one endpoint and pass the function types from the server to the client to be called in the front end. We can consume this function type to know what the backend expects (we get autocomplete that changes when we edit the server functions) automatically.

### tailwind

I love CSS but love colocating, never having to worry about dupe names, and utility classes more.

## Roadmap

- Implement Client validation for forms (example: https://kitchen-sink.trpc.io/react-hook-form?file=feature%2Freact-hook-form%2Findex.tsx#content)
