
import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';  

import { MainLayout } from '../components/layouts/MainLayout'
import { Post } from '../interfaces/post';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function HomePage() {

  const [dataApi, setDataApi] = useState<Post[]>([]);

  const END_POINT = 'https://jsonplaceholder.typicode.com/posts';

  useEffect(() => {
    const getDataApi = async () =>{
      const {data: res} = await axios.get(END_POINT);
      setDataApi(res);
      console.log(res);
    }
    getDataApi();
  
  }, [])

  const createPost = async () => {
    const min = 100;
    const max = 1000;
    const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(randomNum)

    const post:Post = {
      title:'new test',
      body: 'test',
      id:randomNum,
      userId:randomNum

    }
    
    await axios.post(END_POINT, post);
    setDataApi([post, ...dataApi])
  }


  const updatePost = async (id: number, title: string='testing title updated') => { 
    await axios.put(`${END_POINT}/${id}`)
    const tempDataApi = [...dataApi];
    const index = tempDataApi.findIndex(post => post.id===id);
    tempDataApi[index] = {
      id,
      userId: id,
      title,
      body:'test'
    };
    setDataApi(tempDataApi);
  }

  const deletePost = async (id: number) => {
     
    await axios.delete(`${END_POINT}/${id}`) 
    
    setDataApi(dataApi.filter(p=> p.id!==id));
  }
  

  return (
    <MainLayout>
        
        <h1>Home Page</h1>

    <div className='container'>

    <button onClick={createPost} className="btn btn-primary" type="button">Create Post</button>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          
          <TableHead>
            <TableRow>
              <TableCell><h1>Title</h1><p>{`${dataApi.length} results found`}</p></TableCell>
              <TableCell align="right"><h3>Update</h3></TableCell>
              <TableCell align="right"><h3>Delete</h3></TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {dataApi.map(({id, title}) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {title}
                </TableCell>
                
                <TableCell align="right">
                  <button onClick={()=>updatePost(id)} type="button" className="btn btn-outline-success">Update</button>
                </TableCell>
                
                <TableCell align="right">
                  <button onClick={()=>deletePost(id)} type="button" className="btn btn-outline-danger">Delete</button>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

    </div>


        
    </MainLayout>
  )
}