import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import Pagination from 'components/Pagination';
import UserControlsTable from 'components/Tables/UserControlsTable';
import UserControlsFilter from 'components/Filters/UserControlsFilter';
import { useSelector, useDispatch } from 'react-redux';
import { getUserListControls, userListSlice } from 'features/user/userListSlice';
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb2";
function Controls(props) {
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList)
  const setDataProps = (data) => {
    setIsLoading(true)
    dispatch(userListSlice.actions.setListState(data.data))
  }
  useEffect(() => {
    dispatch(getUserListControls({ 'history': props.history }))
  }, [])
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Controls"
            breadcrumbItems={[{ title: "User Management" }, { title: "User Controls" }, { title: "Controls" }]}
          />
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <UserControlsFilter
                    props={props}
                  />
                </CardHeader>
                <CardBody>
                  <UserControlsTable
                    userList={userList}
                    isLoading={isLoading}
                    props={props}
                  />
                  <span>
                    <Pagination dataProps={userList.users} setDataProps={setDataProps} setShowLoading={setIsLoading} isLoading={userList.isFetching || isLoading ? true : false} />
                  </span>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Controls