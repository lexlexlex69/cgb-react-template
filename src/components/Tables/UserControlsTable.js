import React, { useState } from 'react'
import { Table, Badge, Button } from "reactstrap";
import TableLoaders from 'components/Loaders/TableLoaders';
import UserDetailsControl from 'components/Modals/UserDetailsControl';
const UserControlsTable = ({
  userList,
  isLoading,
  props
}) => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState()
  const toggle = (data) => {
    setModalData(data)
    setModal(!modal)
  };
  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th style={{
              width: '40%'
            }}>
              Full Name
            </th>
            <th style={{
              width: '20%'
            }}>
              Role
            </th>
            <th style={{
              width: '10%'
            }}>
              Access
            </th>
            <th style={{
              width: '10%',
              textAlign: "center"
            }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {
            userList.isFetching || isLoading ? (
              <TableLoaders
                row={4}
                col={10}
              />
            ) : (
              userList.users.data && (
                userList.users.data.length === 0 ? (
                  <tr >
                    <td colSpan={4} style={{
                      textAlign: "center"
                    }}>
                      No record found
                    </td>
                  </tr>
                ) : (
                  userList.users.data.map((items, index) => {
                    return (
                      <tr key={items.id}>
                        <td>
                          {items.first_name + ' ' + (items.middle_name ? (items.middle_name.charAt(0) + '. ') : '') + items.last_name + (items.suffix ? ', ' + items.suffix : '')}
                        </td>
                        <td>
                          {items.user_roles.role}<br />
                          {
                            items.divisions && (
                              <i>
                                ({items.divisions.division})
                              </i>
                            )
                          }

                        </td>
                        <td>
                          {
                            items.is_active === 1 ? (
                              <Badge color="success">
                                Enabled
                              </Badge>
                            ) : items.is_active === 0 ? (
                              <Badge color="danger">
                                Disabled
                              </Badge>
                            ) : ''
                          }

                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Button
                            type="button"
                            color="primary"
                            className="btn-sm btn-rounded"
                            onClick={() => { toggle(items) }}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    )
                  })
                )
              )
            )
          }
        </tbody>
      </Table>
      <UserDetailsControl modal={modal} setModal={setModal} toggle={toggle} modalData={modalData} setModalData={setModalData} history={props.history} />
    </>
  )
}

export default UserControlsTable