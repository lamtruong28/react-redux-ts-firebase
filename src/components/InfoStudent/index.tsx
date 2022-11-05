import {
    UserOutlined,
    CalendarTwoTone,
    HomeTwoTone,
    SaveTwoTone,
    UndoOutlined,
  } from '@ant-design/icons';
  import {
    Row,
    Input,
    Space,
    Radio,
    Descriptions,
    Button,
    Tooltip,
    Divider,
    RadioChangeEvent
  } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StudentType } from '../../interface';
import { studentSelector } from '../../redux/selectors';
import studentSlice, { addStudent, fetchAllStudent, updateStudent } from '../../redux/slices/studentSlice';
import { useAppDispatch } from '../../redux/store';
import { convertDateToYMD } from '../../utils';

const InfoStudent = () => {
    const { isEdit, editStudent, loading} = useSelector(studentSelector);
    const dispatch = useAppDispatch();
    const [state, setState] = useState<StudentType>({
        fullName: "",
        dayOfBirth: "",
        gender: "Nam",
        address: ""
    });

    const {fullName, dayOfBirth, gender, address} = state;

    useEffect(()=>{
        setState({
            fullName: editStudent.fullName,
            dayOfBirth: editStudent.dayOfBirth && convertDateToYMD(editStudent.dayOfBirth),
            gender: editStudent.gender,
            address: editStudent.address
        });
    }, [editStudent]);

    const handleStudent =  async () => {
        if(!fullName || !dayOfBirth || !gender || !address) return;
        isEdit ?
            await dispatch(updateStudent({id: editStudent.id, payload: state}))
        :
            await dispatch(addStudent(state));
        await dispatch(fetchAllStudent());
        resetState();
    }

    const resetState = () => {
        dispatch(studentSlice.actions.setIsEdit(false));
        setState({
            fullName: "",
            dayOfBirth: "",
            gender: "Nam",
            address: ""
        });
    }

    const handleChangeName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            fullName: e.target.value
        })
    }

    const handleChangeDate = (e:React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            dayOfBirth: e.target.value
        })
    }

    const handleChangeGender = (e:RadioChangeEvent) => {
        setState({
            ...state,
            gender: e.target.value
        })
    }

    const handleChangeAddress = (e:React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            address: e.target.value
        })
    }

    return ( 
        <div className="wrap-info">
            <Divider>Thông tin chung</Divider>
            <Row gutter={[0, 12]}>
                <Input
                    spellCheck={false}
                    placeholder='Input name student ...'
                    prefix={<UserOutlined  style={{color: "#1890ff"}}  />}
                    value={fullName}
                    onChange={handleChangeName}
                    autoFocus
                />
                <Space>
                <Descriptions bordered>
                    <Descriptions.Item label='Day of birth:' className='wrap-dob'>
                    <Input
                        type='date'
                        prefix={<CalendarTwoTone />}
                        value={dayOfBirth}
                        onChange={handleChangeDate}
                    />
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions bordered>
                    <Descriptions.Item label='Gender:'>
                    <Radio.Group onChange={handleChangeGender} value={gender} >
                        <Radio value="Nam">Nam</Radio>
                        <Radio value="Nữ">Nữ</Radio>
                    </Radio.Group>
                    </Descriptions.Item>
                </Descriptions>
                </Space>
                <Input
                    spellCheck={false}
                    placeholder='Address ...'
                    prefix={<HomeTwoTone />}
                    value={address}
                    onChange={handleChangeAddress}
                />
                <Space>
                    <Tooltip>
                        <Button
                            loading={loading === 'pending'}
                            style={{color: "#1890ff", minWidth: 100}} 
                            type="ghost"
                            icon={<SaveTwoTone />}
                            onClick={handleStudent}
                        >{isEdit ? "Update" : "Save"}</Button>
                    </Tooltip>
                    <Tooltip>
                        <Button 
                            style={{color: "#1890ff"}} 
                            onClick={()=>resetState()} 
                            type="ghost" 
                            icon={<UndoOutlined />}>Reset</Button>
                    </Tooltip>
                </Space>
            </Row>
        </div>
     );
}

export default InfoStudent;