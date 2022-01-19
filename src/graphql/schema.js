const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } = require('graphql');
const Post = require("../models/post")
const slugify = require("slugify")


const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post Type',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The id of the post'
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the post'
        },
        slug: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The slug of the post'
        },
        content: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The content of the post'
        },
        featured_image: {
            type: GraphQLString,
            description: 'The featured image of the post'
        },
        excerpt: {
            type: GraphQLString,
            description: 'The excerpt of the post'
        },
        tags: {
            type: new GraphQLList(GraphQLString),
            description: 'The tags of the post'
        },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The created at of the post'
        },
        updatedAt: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The updated at of the post'
        }
    })
})


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        posts: {
            type: new GraphQLList(PostType),
            description: 'List of Posts',
            resolve: async (parent, args, context, info) => {
                const posts = await Post.find({}).sort({ 'createdAt': -1 })
                return posts
            }
        },
        post: {
            type: PostType,
            description: 'Single Post',
            args: {
                slug: {
                    type: GraphQLString,
                    description: 'The slug of the post'
                },
                id: {
                    type: GraphQLString,
                    description: 'The id of the post'
                }
            },
            resolve: async (parent, args, context, info) => {
                const post = args.slug ? await Post.findOne({ slug: args.slug }) : await Post.findById(args.id)
                return post
            }
        }
    })
});

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        createPost: {
            type: PostType,
            description: 'Create a new post',
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'The name of the post'
                },
                content: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'The content of the post'
                },
                featured_image: {
                    type: GraphQLString,
                    description: 'The featured image of the post'
                },
                excerpt: {
                    type: GraphQLString,
                    description: 'The excerpt of the post'
                },
                tags: {
                    type: new GraphQLList(GraphQLString),
                    description: 'The tags of the post'
                }
            },
            resolve: async (parent, args, context, info) => {
                const { name, content, featured_image, excerpt, tags } = args
                try {
                    const post = await Post.create({ name, slug: slugify(name), content, featured_image, excerpt, tags })
                    return post
                } catch (error) {
                    throw new Error(error)
                }
            }
        },
        updatePost: {
            type: PostType,
            description: 'Update a post',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'The id of the post'
                },
                name: {
                    type: GraphQLString,
                    description: 'The name of the post'
                },
                content: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'The content of the post'
                },
                featured_image: {
                    type: GraphQLString,
                    description: 'The featured image of the post'
                },
                excerpt: {
                    type: GraphQLString,
                    description: 'The excerpt of the post'
                },
                tags: {
                    type: new GraphQLList(GraphQLString),
                    description: 'The tags of the post'
                }
            },
            resolve: async (parent, args, context, info) => {
                const { id, name, content, featured_image, excerpt, tags } = args
                try {
                    const post = await Post.findByIdAndUpdate(id, { name, slug: slugify(name), content, featured_image, excerpt, tags }, { new: true })
                    return post
                } catch (error) {
                    throw new Error(error)
                }
            }
        },
        deletePost: {
            type: PostType,
            description: 'Delete a post',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'The id of the post'
                }
            },
            resolve: async (parent, args, context, info) => {
                const { id } = args
                try {
                    const post = await Post.findByIdAndDelete(id)
                    return post
                } catch (error) {
                    throw new Error(error)
                }
            }
        }
    })
});


const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

module.exports = schema;