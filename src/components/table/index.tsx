import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import axios from "axios";
import { useState, useEffect, FC } from 'react';
import { Notification, Post } from "../../interfaces";


type IProps = {
    setNotification: (msg: Notification) => void;
    setIsOpen: (isOpen: boolean) => void;
    setEditObj: (post: Post) => void;
    setDataApi: (arr: Post[]) => void;
    dataApi: Post[];
}

const PostsTable:FC<IProps> = (props) => {
  
    const { setIsOpen, setEditObj, setNotification, dataApi, setDataApi } = props;

    
    const END_POINT = 'https://jsonplaceholder.typicode.com/posts';

  //**GET**
  useEffect(() => {
    const getDataApi = async () =>{
      const {data: res} = await axios.get(END_POINT);
      setDataApi(res);
      console.log(res);
    }
    getDataApi();
  
  }, [])

  

  // **UPDATE**
  const updatePost = (id: number) => { 
    setIsOpen(true);
    const item = dataApi.find(post => post.id===id);
    console.log(item)
    setEditObj(item!);
  }

  // **DELETE**
  const deletePost = async (id: number) => {
     
    await axios.delete(`${END_POINT}/${id}`) 
    
    setDataApi(dataApi.filter(p=> p.id!==id));

    setNotification({
        msg: "Post deleted successfully.",
        color: "success",
      });
  }
  
  
    return (
        
      <>

        <button onClick={()=>setIsOpen(true)} className="btn btn-primary" type="button">Create Post</button>


        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            
            <TableHead>
                <TableRow>
                <TableCell><h1>Title</h1><p>{`${dataApi.length} results found`}</p></TableCell>
                <TableCell align="right"><h3>Update</h3></TableCell>
                <TableCell align="right"><h3>Delete</h3></TableCell>
                </TableRow>
            </TableHead>
            
            {/* {dataApi.length===0? <p>Getting Data ...</p>: ( */}

            <TableBody>
                {dataApi.slice(0,15).map(({id, title}) => (
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

            {/* ) */}
            {/* } */}

            

            </Table>
        </TableContainer>

      </>
    
  )
}

export default PostsTable

    