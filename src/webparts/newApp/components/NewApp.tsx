import {
  DetailsList,
  DetailsListLayoutMode,
  IIconProps,
  IconButton,
  PrimaryButton
}
  from '@fluentui/react'
import * as React from 'react'
import { sp } from '@pnp/sp/presets/all'
import axios from 'axios';
import { NewStudent } from './NewStudent';
import { UpdateStudent } from './UpdateStudent';

function NewApp() {

  // Icons 
  const addIcon: IIconProps = { iconName: 'Add' }
  const editIcon: IIconProps = { iconName: 'Edit' }
  const deleteIcon: IIconProps = { iconName: 'Delete' }

  // States
  const [list, setList] = React.useState([]);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false)
  const [StudentId, setStudentId] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false)

  // Seutp the base URL
  React.useEffect(() => {
    sp.setup({
      sp: {
        baseUrl: 'https://cubicdirect.sharepoint.com/sites/Krishna'
      }
    });
  }, [])

  // Function to Fetch the data from the lsit 
  const getItemList = async () => {
    await axios.get("https://cubicdirect.sharepoint.com/sites/Krishna/_api/web/lists/getbytitle('FinalList')/items", {
      headers: {
        'Accept': 'application/json;odata=nometadata',
      },

      transformResponse: [(data) => {
        try {
          console.log('Respone Data', data)
          const parseData = JSON.parse(data);
          return parseData.value;
        }
        catch (e) {
          console.error('Error parsing JSON', e)
          return data
        }
      }]
    })
      .then(response => {
        setList(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // To Display the fetched data
  React.useEffect(() => {
    getItemList().then((data) => console.log(data)).catch((err) => console.error(err))
  }, [])


  // Function to delete a student
  const onDeleteStudent = async (Id: any) => {
    await sp.web.lists.getByTitle('FinalList').items.getById(Id)
      .delete()
      .then((result: any) => {
        getItemList()
          .then((data) => console.log(data))
          .catch((err) => console.error(err))
      }).catch((error: any) => {
        console.log(error)
      });
    // alert('Student data Deleted!')
  }

  function toCreateStudent(): void {
    setIsCreateOpen(true)
  }

  function dismissPanel(): void {
    setIsOpen(false)
  }

  function dismissCreatePanel(): void {
    setIsCreateOpen(false)
  }

  function openPanel(id: number): any {
    setIsOpen(true)
    setStudentId(id)
  }

  return (
    <div>

      <h1>CRUD</h1>

      <div className="details">

        <PrimaryButton iconProps={addIcon} onClick={toCreateStudent}>New</PrimaryButton>

        {/* {console.log(list)} */}
        <DetailsList
          items={list}
          columns={[
            { key: 'ID', name: 'Sl.No', fieldName: 'ID', minWidth: 100 },
            { key: 'name', name: 'Student Name', fieldName: 'Usn', minWidth: 100 },
            { key: 'reg', name: 'Register No.', fieldName: 'Usn0', minWidth: 100 },
            { key: 'result', name: 'MobileNo', fieldName: 'MobileNo', minWidth: 100 },
            {
              key: 'action', name: 'Actions', fieldName: 'action', minWidth: 100, onRender: (item) => (
                <div>
                  <IconButton iconProps={editIcon} onClick={() => openPanel(item.Id)} />
                  {/* {console.log(data.Id)} */}
                  <IconButton iconProps={deleteIcon} onClick={(Id) => onDeleteStudent(item.Id)} />
                </div>
              )
            },
          ]}
          setKey='set'
          layoutMode={DetailsListLayoutMode.fixedColumns}
        />

      </div>

      {isCreateOpen && <NewStudent isCreateOpen={isCreateOpen} dismissCreatePanel={dismissCreatePanel} getItemList={getItemList} />}
      {isOpen && <UpdateStudent isOpen={isOpen} dismissPanel={dismissPanel} StudentId={StudentId} getItemList={getItemList} />}
    </div>
  )
}

export default NewApp