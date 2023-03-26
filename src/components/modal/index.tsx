import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useState, useEffect } from 'react';
import { Notification, Post } from '../../interfaces/index';
import axios from 'axios';


type IProps = {
  setNotification: (msg: Notification) => void;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  editObj: Post;
  setDataApi: (arr: Post[]) => void;
  setEditObj: (post: Post) => void;
  dataApi: Post[];
};

const FormDialog:FC<IProps> = (props) => {
  
  const { setNotification , setIsOpen, isOpen, editObj, setDataApi, setEditObj, dataApi  } = props;
  
  const [value, setValue] = useState<string>("");
  const [errorForm, setErrorForm ] = useState(false);

  const END_POINT = 'https://jsonplaceholder.typicode.com/posts';

  //recover data title
  useEffect(() => {
    console.log('use effect '+editObj.title)
    if (editObj.title) {
      setValue(editObj.title);
    }
  }, [editObj.title])

  // UPDATE POST
  const updatePost = async () => {
    const newPost = { 
      title : value,
      body: 'testing',
      userId : 1,
      id: 1
      } as Post;
    //console.log('llega al modal'+ JSON.stringify(updateObj))
    await axios.put(`${END_POINT}/${newPost.id}`, newPost)
    const tempDataApi = [...dataApi];
    const index = tempDataApi.indexOf(editObj);
    console.log('indice encontrado en update  '+ index + '  '+ JSON.stringify(editObj))
    tempDataApi[index] = {...editObj, title:value};
    setDataApi(tempDataApi);

        setNotification({
          msg: "Post Updated Successfully",
          color: "success",
        });
      }
      
      // CREATE POST
      const createPost = async () => {
        const min = 100;
        const max = 1000;
        const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
        //console.log(randomNum)
    
        const post = {
          title: value,
          body: 'test body empty',
          // id: randomNum,
          // userId: randomNum
        }
        
        await axios.post(END_POINT, post);
        setDataApi([{
          body:post.body,
          id:randomNum,
          userId:randomNum,
          title: post.title
        }, ...dataApi])
        setNotification({ msg: "Post Added Successfully", color: "success" });
      }    


  
  const handleClose = () => {
    setIsOpen(false);
    setValue("");
    setEditObj({userId: 0, title: "", body: "", id: 0});
  };

  const onSubmit = async () => {
    if(value.trim()===""){
      setErrorForm(true);
      return
    }
    setErrorForm(false);

    if (editObj.title) {
      await updatePost();
    } else {
      await createPost();
    }
    handleClose();
  };

  return (
    <div>
      
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{editObj.title ? "Update Post" : "Add New Post"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
             {errorForm ? <p style={{color:'red'}}>you cannot leave the field empty</p> : 'write the title of the post'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Post title"
            type="text"
            fullWidth
            variant="standard"
            value={value}
            onChange={(e)=> setValue(e.target.value) }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Add Post</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

export default FormDialog;