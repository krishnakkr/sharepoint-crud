import * as React from 'react'
import { sp } from '@pnp/sp/presets/all'
import { DefaultButton, IIconProps, Panel, PanelType, PrimaryButton, TextField } from '@fluentui/react'
import axios from 'axios'

export interface UpdateStudentProps {
    isOpen: boolean
    dismissPanel: () => void
    StudentId: number
    getItemList: () => void
}

const saveIcon: IIconProps = { iconName: 'Save' }
const cancelIcon: IIconProps = { iconName: 'Cancel' }

export const UpdateStudent: React.FC<UpdateStudentProps> = ({ isOpen, dismissPanel, StudentId, getItemList }) => {
    const [inputStudent, setInputStudent] = React.useState({
        Usn: '',
        Usn0: 0,
        MobileNo: ' ',
        studentId: []
    })

    React.useEffect(() => {
        sp.setup({
            sp: {
                baseUrl: 'https://cubicdirect.sharepoint.com/sites/Krishna'
            }
        });
    }, [])

    React.useEffect(() => {
        axios.get("https://cubicdirect.sharepoint.com/sites/Krishna/_api/web/lists/getbytitle('FinalList')/items", {
            headers: {
                'Accept': 'application/json;odata=nometadata',
            },
            // withCredentials: true,
            transformResponse: [(data) => {
                try {
                    // console.log('data inside try', data)
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
                const result = response.data.filter((item: any) => item.ID === StudentId)
                setInputStudent(result[0])
                // console.log(result);

            })
            .catch((error) => {
                console.error(error)
            })

    }, [])

    const updateStudent = async () => {
        await sp.web.lists.getByTitle('FinalList').items.getById(StudentId).update({ Usn: inputStudent.Usn, Usn0: inputStudent.Usn0, MobileNo: inputStudent.MobileNo }).then((result: any) => {
            dismissPanel()
            getItemList()
        }).catch((err: any) => {
            console.log(err)

        })
    }

    const handleInputChange = (event: any) => {
        let { name, value } = event.target;
        setInputStudent((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }

    React.useEffect(() => {

        const getStudentData = () => {
            Promise.all(
                inputStudent.studentId.map((Id) =>
                    sp.web.siteUsers.getById(Id).get().then((student) => (
                        {
                            Id: student.Id,
                            // Add other properties as needed
                        }
                    ))
                )
            )
                .then((studentdata) => {
                    console.log('Student Details', studentdata);
                })
                .catch((error) => {
                    console.error('Error fetching Student data:', error);
                });
        };

        if (inputStudent.studentId?.length > 0) {
            getStudentData();
        }

    }, [inputStudent.studentId]);

    return (
        <>
            {/* Panel Container */}
            <div className="panel-container">
                <Panel
                    headerText={'Update Student Details'}
                    isOpen={isOpen}
                    type={PanelType.custom}
                    customWidth='40%'
                    onDismiss={dismissPanel}
                >

                    <TextField
                        className='input'
                        placeholder='Enter Student Name'
                        label='Student Name' required
                        name='Usn'
                        value={inputStudent.Usn}
                        onChange={handleInputChange}
                    />

                    <TextField
                        className='input'
                        placeholder='Enter Student Register number'
                        label='Student Register Number'
                        name='Usn0'
                        value={inputStudent.Usn0 !== undefined ? inputStudent.Usn0.toString() : '0'}
                        onChange={handleInputChange}
                    />

                    <TextField
                        className='input'
                        placeholder='Pass / Fail'
                        label='Student Result' required
                        name='MobileNo'
                        value={inputStudent.MobileNo}
                        onChange={handleInputChange}
                    />

                    <PrimaryButton className='btn' iconProps={saveIcon} onClick={updateStudent}>Update</PrimaryButton>
                    <DefaultButton className='btn' iconProps={cancelIcon} onClick={dismissPanel}>Cancel</DefaultButton>

                </Panel>
            </div>
            {/* Panel Container */}
        </>
    );
};