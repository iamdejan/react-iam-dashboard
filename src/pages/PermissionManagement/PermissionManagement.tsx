import { Box, Paper, Table, TableData, Title } from "@mantine/core";
import { JSX } from "react";
import { permissionsData } from "../../data/permissions";

export default function PermissionManagement(): JSX.Element {
  const data: TableData = {
    caption: "List of permissions.",
    head: ["ID", "Team", "Permission"],
    body: permissionsData.map((permission) => {
      return [permission.id, permission.team, permission.toString()];
    }),
  };

  return (
    <Box>
      <Title order={1}>Permission Management</Title>
      <Paper mt="1rem">
        <Table data={data} highlightOnHover withColumnBorders />
      </Paper>
    </Box>
  );
}
