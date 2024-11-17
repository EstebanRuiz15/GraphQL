import { IResolvers } from '@graphql-tools/utils';
import axios from 'axios';

const PostResolver: IResolvers = {
    Query: {
       async getPosts() {
            try {
                const response = await axios.get('https://my-json-server.typicode.com/typicode/demo/posts');
                return response.data;
              } catch (error) {
                console.error('Error fetching Posts:', error);
                return [];
              }
        }
    }
}

export default PostResolver;