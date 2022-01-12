const express = require("express"),
    cors = require("cors"),
    mongoose = require("mongoose"),
    expressGraphQL = require("express-graphql").graphqlHTTP;
const PORT = process.env.PORT || 8080;
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

mongoose.connect(`mongodb+srv://champ:champ@champ.cxkmd.mongodb.net/blog?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => console.log("Conneted"),
    err => console.error(err)
);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/v1', require('./routes/index'));

app.use('/api/v2/graphql', expressGraphQL({
    schema: require('./graphql/schema'),
    graphiql: true
}));

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));


