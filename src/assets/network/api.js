import { get,post,put } from './http'


export const apiAddress = Userid => get('/a/u/user/personal?'+`${Userid}`);
export const apiAddSend =phone => post('/a/u/user/getYzm?'+`${phone}`);
export const phoneEdit =idCode => post('/a/u/user/binding?'+`${idCode}`);
export const mainEdit = getData => put('/a/u/user/update?'+`${getData}`);

export const apiAddHead = p => get('/a/u/wx/messages?', p); //头像

export const redRews = a => get('/a/message/home/List?'+`${a}`);
