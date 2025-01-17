//import elysia
import { Elysia } from 'elysia';
//import controller
import { getFolders } from '../controller/FolderController';

const FolderRoutes = new Elysia({ prefix: '/folders' })

  //route get all posts
  .get('/', () => getFolders())

export default FolderRoutes;