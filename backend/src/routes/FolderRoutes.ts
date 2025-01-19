//import elysia
import { Elysia, t } from 'elysia';
//import controller
import { createFolder, getDetailFolder, getFolders, getSubFolderById } from '../controller/FolderController';

const FolderRoutes = new Elysia({ prefix: '/folders' })

  //route get all posts
  .get('/', () => getFolders())
  .post('/', ({body}) => createFolder(body as { name: string; folder_id: number }), {
    body: t.Object({
      name: t.String({
        minLength: 3,
        maxLength: 100,
      }),
      folder_id: t.Number({
        minLength: 1,
        maxLength: 1000,
      }),
    })
  })
  .get('/:id', ({params: { id }}) => getDetailFolder(id))
  .get('/:id/subfolders', ({params: { id }}) => getSubFolderById(id))
export default FolderRoutes;