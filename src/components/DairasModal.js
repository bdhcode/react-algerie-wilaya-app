import React, { useState } from "react";
import { Modal, List, Button } from "antd";

function DairasModal({ visible, onClose, selectedWilaya, onShowDairaDetail }) {
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      onOk={onClose}
      title={`${selectedWilaya?.name} دائرات`}
    >
      <List
        dataSource={selectedWilaya?.dairas}
        renderItem={(daira) => (
          <List.Item
            actions={[
              <Button
                onClick={() => {
                  onShowDairaDetail(daira);
                }}
              >
                رؤية بلديات
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={daira.name}
              description={`لديها ${(daira?.communes ?? []).length} بلديات`}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
}

export default DairasModal;
