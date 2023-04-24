import React, {useState, useEffect} from 'react';
import { Layout} from 'antd';
import {Table, Input, Button, Select} from 'antd'
import { Form} from 'antd';
import axios from 'axios';
import {  DeleteOutlined, FlagOutlined } from "@ant-design/icons";
import { DatePicker } from 'antd';
const { Content} = Layout;


const { Option } = Select;

const UserList = ()=>{

    const [form] = Form.useForm();

   const [task, setTask] = useState({
    data : []
   })

   const [important, setImportant] = useState(true)
   const [user, setUser] = useState({
    data : []
   })

   const activate=()=>{
    setImportant(false)
   }

   const deactivate=()=>{
    setImportant(true)
   }

    useEffect(()=>{
        getData();
        getUser()
    },[])

    const getData = async()=>{
        await axios.get("http://localhost:8000/userList/getTasks")
        .then((res)=>{
          console.log("res", res)
          setTask({data : res.data.result})
        })
        .catch((err)=>{
          console.log(err)
        })
      }

      const getUser = async()=>{
        await axios.get("http://localhost:8000/userList/getUsers")
        .then((res)=>{
          console.log("usersss", res)
          setUser({data : res.data.result})
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    const dataSource = task.data

    const columns = [
        {
          title: 'Task',
          dataIndex: 'Task',
          key: 'Task',
        },
        {
          title: 'Expiry date',
          dataIndex: "Expiry_date",
          key: "Expiry_date",
        },
        {
          title: 'User',
          dataIndex: 'User',
          key: 'User',
          render: (User) => (
            <Select
            style={{ width: 120 }} 
            defaultValue={User}
            >
         
            {task.data.map((option, key) => (
                      <Option key={key}  >{option.User}</Option>
                    ))}

          </Select>
          )
        },
        {
            title: 'Important',
            dataIndex: 'Important',
            key: 'Important',
            render: (Important) => 
            Important === true ? 
            <FlagOutlined /> :
            <FlagOutlined style={{ color: "red" }}/> 
        },
        {
            title: 'Created_on',
            dataIndex: 'Created_on',
            key: 'Created_on',
        },
        {
            title: 'Action',
            render: () =>(
                <DeleteOutlined/>
            )
        },
      ];

    return(
        <div>
            <Layout style={{minHeight: "100vh"}}>
            <Content
        className="site-layout"
        style={{ 
          margin: "24px 16px 0", 
          overflow: "initial" ,
          
        }}
      >
            <h1>User Tasks</h1><br/><br/>
            <Form form={form} name="horizontal_login" layout="inline" >
            <Form.Item
                label="Task"
                rules={[
                {
                    message: 'Task Description',
                },
                ]}
            >
        <Input.TextArea showCount maxLength={200} />
      </Form.Item>

      <Form.Item label="Expiry Date" >
      <DatePicker
        style={{
          width: '100%',
        }}
      />
    </Form.Item>

    <Form.Item label="Users" >
            <Select
            style={{ width: 120 }} 
            >
         
            {user.data.map((option, key) => (
                      <Option key={key}  >{option.name}</Option>
                    ))}

          </Select>
    </Form.Item>

    <Form.Item label="Important" >
           {
             important ? 
             <FlagOutlined onClick = {()=>activate()} /> :
             <FlagOutlined onClick = {()=>deactivate()} style={{ color: "red" }}/> 
           }
        </Form.Item>

        <Form.Item>
        <Button type="primary" htmlType="submit">
          {" "}
          Submit{" "}
        </Button>
        </Form.Item>

            </Form><br/><br/>
          <Table scroll={{ x: true }} columns={columns} dataSource={dataSource} pagination={{
            defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']
            }
          } />
          </Content>
          </Layout>
        </div>
    )
}

export default UserList