import React, { useContext, useEffect, useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Rate, Space, Spin, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import { getAllFeedback } from '../../../../services/API/feedbackService';
import Spinner from '../../../../components/Spinner';
import { AlertContext } from '../../../../components/Layouts/DashBoard';
import getUserData from '../../../../route/CheckRouters/token/Token';

const ManageFeedback = () => {
  // thông báo
  const Alert = useContext(AlertContext);
  // useState cho mảng dữ liệu feedback
  const [feedbacks, setFeedbacks] = useState([]);
  // useState clear search , sort
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  // useState cho search
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  // xửa lý filetr and sort
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };



  // tải dữ liệu và gán vào feedback thông qua hàm setFeedback
  const loadFeedbacks = async () => {
    const fetchedFeedback = await getAllFeedback();
    // thêm key vào mỗi feedback
    const feedbackWithKeys = fetchedFeedback.map((feedback, index) => ({
      ...feedback,
      key: index.toString(),
    }));
    setFeedbacks(feedbackWithKeys);
  };
  // thực hiện load dữ liệu 1 lần 
  useEffect(() => {
    loadFeedbacks();
  }, []);
  


  console.log(feedbacks)



  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '10.666%',
      // sort 
      filteredValue: filteredInfo.id || null,
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('id'),

    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: '10.666%',
      render: (_, { image }) => {
        return (
          image ? <img src={"http://localhost:8080/images/doctor/" + image} width="150" alt="" /> : null);
      },

    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      width: '16.666%',
      filteredValue: filteredInfo.fullName || null,
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      sortOrder: sortedInfo.columnKey === 'fullName' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('fullName'),

    },
    
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: '16.666%',
      filteredValue: filteredInfo.gender || null,
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      sortOrder: sortedInfo.columnKey === 'gender' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('gender'),
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      // width: '15.666%',
      // sort 
      filteredValue: filteredInfo.rate || null,
      sorter: (a, b) => a.rate - b.rate,
      sortOrder: sortedInfo.columnKey === 'rate' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('rate'),
      render: (_, { rate }) => {
        
        return (
          <Rate count={5} disabled defaultValue={rate}/>
        );
      },

    },

    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link style={{ marginRight: '16px' }}
            to={`/dashboard/admin/manage-feedback/detail/${record.id}`}>
            <Button type="primary" icon={<EyeOutlined />} >
              Detail
            </Button>
          </Link>

          

        </div>
      ),
    },
  ];
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <Space>
          <Button onClick={clearFilters}>Clear filters and search</Button>
          <Button onClick={clearAll}>Clear All</Button>
        </Space>

        {/* <Link to="/dashboard/admin/manage-news/create">
          <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#52c41a' }}>
            Add New News
          </Button>
        </Link> */}
      </Space>

        <Table columns={columns} dataSource={feedbacks} onChange={handleChange} />
    </>
  )
};




export default ManageFeedback;