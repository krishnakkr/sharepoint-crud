import React from "react";
import { sp } from "@pnp/sp/presets/all";
interface ItemList {
  ID: string;
 Title: string;
 name: string;
 "odata.type": string;
  "odata.id": string;
}
function TestComponent() {
  const [data, setData] = React.useState(null);
  const [items, setItems] = React.useState<ItemList[]>([]);
  const [newItem, setNewItem] = React.useState({ Title: "", name: "" });
  
  const getDataFromList = async () => {
    try {
      let res = await sp.web.lists.getByTitle("Testing1").items.get();
      setItems(res.map((item) => ({ key: item.Id.toString(), ...item })));
      console.log("ResponseData of Get Element", res);
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const insertDataIntoList = async () => {
    try {
      let res = await sp.web.lists.getByTitle("Testing1").items.add({
        Title: "Mr.",
        name: "Babu",
      });
      console.log("ResponseData of Push Element", res);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const updateDataList = async (item: ItemList) => {
    try {
      const itemId = item.ID; // Extracting the ID property from the item object
      let res = await sp.web.lists.getByTitle("Testing1").items.getById(5).update({
        Title: "New Title2",
        name: "New Name2",
      });
      console.log("ResponseData of Update Element", res);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  

  const deleteDataList = async () => {
    try {
      let res = await sp.web.lists.getByTitle("Testing1").items.getById(3).delete();
      console.log("ResponseData of Delete Element", res);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      <h2>TestComponent</h2>
      <button onClick={getDataFromList}>Fetch Data</button>
      <button onClick={insertDataIntoList}>Insert Data</button>
      {/* <button onClick={updateDataList}>Update Data</button> */}
      <button onClick={deleteDataList}>Delete Data</button>
      <div>
        <h3>Data:</h3>
        {data && (
          <ul>
            {data.map((item: { Id: React.Key; Title: any; name: any; }) => (
              <li key={item.Id}>
                <strong>Title:</strong> {item.Title}, <strong>Name:</strong> {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TestComponent;
