import { useSelector } from 'react-redux';
import { Table, Space } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { DataType } from '../../interface';
import { useAppDispatch } from '../../redux/store';
import { studentSelector } from '../../redux/selectors';
import studentSlice, { fetchAllStudent, removeStudent } from '../../redux/slices/studentSlice';
import type { ColumnsType } from 'antd/es/table';

type TableStudentProps = {
  dataSource: DataType[]
}
const TableStudent = ({dataSource}:TableStudentProps) => {
    const {loading} = useSelector(studentSelector);
    const dispatch = useAppDispatch();

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Day of birth',
      dataIndex: 'dayOfBirth',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Actions',
      render: (record)=>{
        return <Space>
                <EditTwoTone 
                  onClick={()=>handleEdit(record)}
                  className='btn-edit' />
                <DeleteTwoTone
                  onClick={()=>handleDelete(record)}
                  twoToneColor='#f20' className='btn-delete'/>
              </Space>
      }
    },
  ];

  const handleEdit =async (record:DataType) => {
    dispatch(studentSlice.actions.setEditStudent(record));
  }

  const handleDelete = async (record:DataType) => {
    const option = confirm("Bạn có muốn xóa sinh viên này?");
    if(option) {
      await dispatch(removeStudent(record.id));
      await dispatch(fetchAllStudent());
    }
  }

  return <Table
            loading = {loading === 'pending'}
            pagination={{ pageSize: 5 }}
            rowKey={record => record.id} 
            columns={columns}
            dataSource={dataSource}
            bordered
          />;
}

export default TableStudent;