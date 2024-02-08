// import * as React from "react";
// import { IColumn } from "@fluentui/react/lib/DetailsList";
// import { TextField } from "@fluentui/react/lib/TextField";
// import {
//   DetailsList,
//   DetailsListLayoutMode,
// } from "@fluentui/react/lib/DetailsList";
// import { PrimaryButton } from "@fluentui/react/lib/Button";
// import { sp } from "@pnp/sp/presets/all";
// import axios from "axios";
// function Mainbody(){
//   const [list, setList] = React.useState([]);
//   const [isCreateOpen, setIsCreateOpen] = React.useState(false)
//   const [StudentId, setStudentId] = React.useState(0)
//   const [isOpen, setIsOpen] = React.useState(false)
// }
// const getItemList = async () => {
//   await axios.get("https://cubicdirect.sharepoint.com/sites/Krishna/_api/web/lists/getbytitle('crudoperations')/items", {
//     headers: {
//       'Accept': 'application/json;odata=nometadata',
//     },

//     transformResponse: [(data) => {
//       try {
//         // console.log('Respone Data', data)
//         const parseData = JSON.parse(data);
//         return parseData.value;
//       }
//       catch (e) {
//         console.error('Error parsing JSON', e)
//         return data
//       }
//     }]
//   })
//     .then(response => {
//       setList(response.data)
//     })
//     .catch((error) => {
//       console.error(error)
//     })
// }
// React.useEffect(() => {
//   getItemList().then((data) => console.log(data)).catch((err) => console.error(err))
// }, [])

// const onDeleteStudent = async (Id: any) => {
//   await sp.web.lists.getByTitle('Crud').items.getById(Id)
//     .delete()
//     .then((result: any) => {
//       getItemList()
//         .then((data) => console.log(data))
//         .catch((err) => console.error(err))
//     }).catch((error: any) => {
//       console.log(error)
//     });
//   alert('Student data Deleted!')
// }

// function toCreateStudent(): void {
//   setIsCreateOpen(true)
// }

// function dismissPanel(): void {
//   setIsOpen(false)
// }

// function dismissCreatePanel(): void {
//   setIsCreateOpen(false)
// }

// function openPanel(id: number): any {
//   setIsOpen(true)
//   setStudentId(id)
// }
// return (
//   <div>

//     <h1>CRUD OPERATIONS IN SPFX</h1>
//     <div>




//       {/* Table View to dsiplay data */}
//       {/* <table>
//         <tr>
//           {columns.map((column) => (
//             <th key={column.columnKey}>
//               {column.label}
//             </th>
//           ))}
//         </tr>


//         {list.map((data: any) => (
//           <tr>
//             <td> {data.Id} </td>
//             <td> {data.Username} </td>
//             <td> {data.RollNo} </td>
//             <td> {data.Results} </td>
//             <td> <IconButton iconProps={editIcon} onClick={() => openPanel(data.Id)} />
//               <IconButton iconProps={deleteIcon} onClick={(Id) => onDeleteStudent(data.Id)} /> </td>
//           </tr>
//         ))}

//       </table> */}

//     </div>

//     <div className="details">

//       <PrimaryButton iconProps={addIcon} onClick={toCreateStudent}>New</PrimaryButton>

//       {/* {console.log(list)} */}
//       <DetailsList
//         items={list}
//         columns={[
//           { key: 'ID', name: 'Sl.No', fieldName: 'ID', minWidth: 100 },
//           { key: 'name', name: 'Student Name', fieldName: 'Username', minWidth: 100 },
//           { key: 'reg', name: 'Register No.', fieldName: 'RollNo', minWidth: 100 },
//           { key: 'result', name: 'Results', fieldName: 'Results', minWidth: 100 },
//           {
//             key: 'action', name: 'Actions', fieldName: 'action', minWidth: 100, onRender: (item) => (
//               <div>
//                 <IconButton iconProps={editIcon} onClick={() => openPanel(item.Id)} />
//                 {/* {console.log(data.Id)} */}
//                 <IconButton iconProps={deleteIcon} onClick={(Id) => onDeleteStudent(item.Id)} />
//               </div>
//             )
//           },
//         ]}
//         setKey='set'
//         layoutMode={DetailsListLayoutMode.fixedColumns}
//       />

//     </div>

//     {isCreateOpen && <NewStudent isCreateOpen={isCreateOpen} dismissCreatePanel={dismissCreatePanel} getItemList={getItemList} />}
//     {isOpen && <UpdateStudent isOpen={isOpen} dismissPanel={dismissPanel} StudentId={StudentId} getItemList={getItemList} />}
//   </div>
// )
//       }
// export default Mainbody;