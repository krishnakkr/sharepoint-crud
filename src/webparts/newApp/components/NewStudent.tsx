import * as React from 'react'
import { Web, sp } from '@pnp/sp/presets/all'
import { DefaultButton, IIconProps, Panel, PanelType, PrimaryButton, TextField } from '@fluentui/react'

export interface NewStudentProps {
    isCreateOpen: boolean
    dismissCreatePanel: () => void
    getItemList: () => void
}


const saveIcon: IIconProps = { iconName: 'Save' }
const cancelIcon: IIconProps = { iconName: 'Cancel' }

export const NewStudent: React.FC<NewStudentProps> = ({ isCreateOpen, dismissCreatePanel, getItemList }) => {
    const [inputStudent, setInputStudent] = React.useState({
        Usn: '',
        Usn0: 0,
        MobileNo: 0
    })

    React.useEffect(() => {
        sp.setup({
            sp: {
                baseUrl: 'https://cubicdirect.sharepoint.com/sites/Krishna'
            }
        });
    }, [])

    const saveStudent = async () => {
        await sp.web.lists.getByTitle('FinalList').items.add(inputStudent).then((result: any) => {
            dismissCreatePanel()
            getItemList()
        })
    }

    const handleInputChange = (event: any) => {
        let { name, value } = event.target;
        setInputStudent((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }


    return (
        <>
            {/* Panel Container */}
            <div className="panel-container">
                <Panel
                    headerText={'Add Student Details'}
                    isOpen={isCreateOpen}
                    type={PanelType.custom}
                    customWidth='40%'
                    onDismiss={dismissCreatePanel}
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
                        placeholder='Enter mobile no'
                        label='Mobile No' required
                        name='MobileNo'
                        value={inputStudent.MobileNo !== undefined ? inputStudent.MobileNo.toString() : '0'}
                        onChange={handleInputChange}
                    />

                    <PrimaryButton className='btn' iconProps={saveIcon} onClick={saveStudent}>Save</PrimaryButton>
                    <DefaultButton className='btn' iconProps={cancelIcon} onClick={dismissCreatePanel}>Cancel</DefaultButton>
                </Panel>
            </div>
            {/* Panel Container */}
        </>
    );
};