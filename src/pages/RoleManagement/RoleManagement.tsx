import { Box, Paper, Table, TableData, Title } from "@mantine/core";
import { JSX } from "react";
import { rolesData } from "../../data/roles";

export default function RoleManagement(): JSX.Element {
  const tableData: TableData = {
    caption: "List of roles.",
    head: ["ID", "Team", "Role"],
    body: rolesData.map((role) => {
      return [role.id, role.team, role.toString()];
    })
  };

  return (
    <Box>
      <Title order={1}>Role Management</Title>

      <Paper mt="1rem">
        <Table data={tableData} highlightOnHover withColumnBorders />
      </Paper>
    </Box>
  );
}
