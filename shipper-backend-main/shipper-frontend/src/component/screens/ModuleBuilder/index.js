import { Button, Card } from "antd";
import React from "react";
import { IoAdd } from "react-icons/io5";
import ModuleLookup from "./ModuleLookup";
import { BsFillPeopleFill } from "react-icons/bs";
import Componentbuilder from "./Componentbuilder";

export const ModuleViewPage = () => {
  const [addModuleopen, setModuleopen] = React.useState(false);

  return (
    <Card
      size="large"
      title={
        <>
          <BsFillPeopleFill className="me-2" /> <span>Module list </span>
        </>
      }
      extra={
        <Button
          type="primary"
          icon={<IoAdd />}
          onClick={() => setModuleopen(true)}
        >
          Add Module
        </Button>
      }
    >
      <ModuleLookup addModuleopen={addModuleopen} />

      <Componentbuilder
        addModuleopen={addModuleopen}
        setModuleopen={setModuleopen}
      />
    </Card>
  );
};
