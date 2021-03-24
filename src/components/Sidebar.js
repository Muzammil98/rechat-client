import React, { useState } from "react";
import { Tab, Nav ,Button, Modal} from "react-bootstrap";
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import NewConversationModel from './NewConversationModel'
import NewContactModel from './NewContactModel'

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState("conversations");
  const [modalOpen, setModalOpen] = useState(false)
  function closeModal(){
      setModalOpen(false)
  }
    const conversationsOpen = activeKey === 'conversations'
  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey="conversations">Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="contacts">Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey="conversations">
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey="contacts">
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className='p-2 border-top border-right small'>
          Your user id: <p className="text-muted small">{id}</p>
        </div>
        <Button onClick={()=>setModalOpen(true)} className='rounded-0' variant='danger'>
            New {conversationsOpen? 'conversations' : 'contact'}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
          {conversationsOpen ?
          <NewConversationModel closeModal={closeModal}/>:<NewContactModel closeModal={closeModal}/>}
      </Modal>
    </div>
  );
}
