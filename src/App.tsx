import { useEffect } from 'react'
import { useSelector} from 'react-redux'
import { Col, Row } from 'antd';
import TableStudent from './components/TableStudent';
import InfoStudent from './components/InfoStudent';
import { fetchAllStudent } from './redux/slices/studentSlice';
import { studentSelector } from './redux/selectors';
import { useAppDispatch } from './redux/store';
import './App.css'

function App() {
  const { listStudent } = useSelector(studentSelector);
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(fetchAllStudent());
  }, [])

  return (
    <div className="app">
      <h1 style={{textAlign: 'center', margin: 12}}>Quản lý thông tin sinh viên</h1>
      <Row gutter={20}>
          <Col span={12}>
            <InfoStudent/>
          </Col>
          <Col span={12}>
            <TableStudent dataSource={listStudent} />
          </Col>
      </Row>
    </div>
  )
}

export default App
