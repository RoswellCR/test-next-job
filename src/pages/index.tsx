
import { useState, useEffect } from 'react';

import { MainLayout } from '../components/layouts/MainLayout'
import Notification from '../components/notification';
import PostsTable from '../components/table';
import FormDialog from '../components/modal';

import { Post } from '../interfaces';


export default function HomePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editObj, setEditObj] = useState<Post>({userId: 0, title: "", body: "", id: 0}); // <<initialize>>
  const [notification, setNotification] = useState<Notification>({ msg: "", color: "" });
  const [dataApi, setDataApi] = useState<Post[]>([]);
  

  return (
    <MainLayout>
        
        <PostsTable
          setIsOpen={setIsOpen}
          setEditObj={setEditObj}
          setNotification={setNotification}
          dataApi={dataApi}
          setDataApi={setDataApi}
        />
        <FormDialog 
          setNotification={setNotification}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          editObj={editObj}
          setDataApi={setDataApi}
          setEditObj={setEditObj}
          dataApi={dataApi}
        />
        {
          notification.msg && <Notification
          notification={notification}
          setNotification={setNotification}
          />
        }

    </MainLayout>
  )
}