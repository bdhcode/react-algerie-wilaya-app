import { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Input, Card, Button, Modal, List } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import wilayasDataset from "./data/wilayas.json";
import DairasModal from "./components/DairasModal";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [wilayasModalVisible, setWilayasModalVisible] = useState(false);
  const [results, setResults] = useState([]);

  const [dairasModalVisible, setDairasModalVisible] = useState(false);
  const [selectedWilaya, setSelectedWilaya] = useState(null);

  const [communeModalVisible, setCommuneModalVisible] = useState(false);
  const [selectedDaira, setSelectedDaira] = useState(null);

  const handleSearchIntent = ({ nativeEvent: { key } }) => {
    if (key === "Enter") {
      const filtered = wilayasDataset.wilayas.filter((wilaya) => {
        const wilayaName = wilaya.name;
        const searchValueLength = searchValue.length;
        const partialWilayaName = wilayaName.slice(0, searchValueLength);
        if (
          partialWilayaName.toLocaleUpperCase() ===
          searchValue.toLocaleUpperCase()
        ) {
          return true;
        } else {
          return false;
        }
      });
      setResults(filtered);
      setWilayasModalVisible(true);
      console.log(filtered);
    }
  };

  return (
    <div className={"master"}>
      <Card className={"searchcard"} title={"إبحث عن ولايات"}>
        <div style={{ display: "flex" }}>
          <Input
            placeholder={"إسم الولاية"}
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
            onKeyDown={handleSearchIntent}
          />
          <Button
            onClick={() =>
              handleSearchIntent({ nativeEvent: { key: "Enter" } })
            }
            shape={"circle"}
            icon={<SearchOutlined />}
          />
        </div>
      </Card>
      <Modal
        visible={wilayasModalVisible}
        onCancel={() => setWilayasModalVisible(false)}
        onOk={() => setWilayasModalVisible(false)}
        title={"نتائج البحث"}
      >
        <List
          renderItem={(wilaya) => (
            <List.Item
              actions={[
                <Button
                  onClick={() => {
                    setDairasModalVisible(true);
                    setSelectedWilaya(wilaya);
                  }}
                >
                  رؤية دائرات
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={wilaya.name}
                description={`لديها ${wilaya.dairas.length} دائرات`}
              />
            </List.Item>
          )}
          dataSource={results}
        />
      </Modal>
      <DairasModal
        selectedWilaya={selectedWilaya}
        visible={dairasModalVisible}
        onClose={() => setDairasModalVisible(false)}
        onShowDairaDetail={(daira) => {
          setCommuneModalVisible(true);
          setSelectedDaira(daira);
        }}
      />
      <Modal
        visible={communeModalVisible}
        onCancel={() => setCommuneModalVisible(false)}
        onOk={() => setCommuneModalVisible(false)}
        title={`${selectedDaira?.name} بلديات`}
      >
        <List
          dataSource={selectedDaira?.communes}
          renderItem={(commune) => (
            <List.Item>
              <List.Item.Meta title={commune.name} />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}

export default App;
